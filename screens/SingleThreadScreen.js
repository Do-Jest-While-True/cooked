import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'

import { getThreadMessages, postNewMessage } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

// to make the new message nav issue work:
// ---------------------------------------
// change getThreadMessages slice to utilize a username instead of other users ID

// don't rely on otherUser info to be passed down through route, just fetch it with gotUser() -- but that GET route wants a user's id so that will also need to be refactor to accept a username OR make another getUserByUsername route.........

const SingleThreadScreen = ({
  route,
  postNewMessage,
  getThreadMessages,
  singleThreadMessages,
  auth,
}) => {
  const [refreshing, setRefreshing] = React.useState(false)
  const [messageInput, setMessageInput] = useState('')

  const threadId = route.params.thread.id
  const otherUser = route.params.thread.user

  const scrollViewRef = useRef()

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(1000).then(() => setRefreshing(false))
    getThreadMessages(threadId)
  }, [])

  useEffect(() => {
    getThreadMessages(threadId)
  }, [])

  const handleSendMessage = () => {
    const newMessageData = {
      body: messageInput,
      threadId: threadId,
      sentTo: otherUser.id,
      sentBy: auth.id,
    }
    postNewMessage(newMessageData)
    setMessageInput('')
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView
      style={[defaultStyles.container, styles.container]}
      behavior="padding"
      keyboardVerticalOffset={80}
    >
      {/* TOP ROW USER INFO */}
      <View style={styles.otherUserRow}>
        <Image
          source={{ uri: otherUser.profileImageUrl }}
          style={styles.profileImage}
        />
        <View>
          <Text style={defaultStyles.text}>
            {otherUser.firstName} {otherUser.lastName}
          </Text>
          <Text style={styles.username}>@{otherUser.username}</Text>
        </View>
      </View>
      {/* CHAT MESSAGES */}
      {singleThreadMessages && (
        <FlatList
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.white}
            />
          }
          data={singleThreadMessages}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <View
              style={
                item.sentTo === otherUser.id
                  ? [styles.msgBubble, styles.msgBubbleRight]
                  : styles.msgBubble
              }
            >
              <Text style={[defaultStyles.text, styles.msgText]}>
                {item.body}
              </Text>
            </View>
          )}
        />
      )}
      {/* MESSAGE INPUT */}
      <View style={styles.sendMessageRow}>
        <TextInput
          placeholder="Enter Message"
          placeholderTextColor={colors.lightGray}
          style={[styles.formInput]}
          clearButtonMode="always"
          multiline={true}
          onChangeText={(val) => {
            setMessageInput(val)
          }}
          value={messageInput}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <FontAwesome
            name="send"
            size={24}
            color={colors.white}
            style={styles.sendMsgBtn}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const mapState = (state) => ({
  auth: state.auth,
  singleThreadMessages: state.singleThreadMessages,
})

const mapDispatch = (dispatch) => ({
  getThreadMessages: (threadId) => dispatch(getThreadMessages(threadId)),
  postNewMessage: (msg) => dispatch(postNewMessage(msg)),
})

export default connect(mapState, mapDispatch)(SingleThreadScreen)

const styles = StyleSheet.create({
  container: {
    // paddingTop: 15
  },
  otherUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 0.25,
    backgroundColor: colors.mainFaded,
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    margin: 15,
  },
  username: {
    marginVertical: 10,
    color: colors.lightBlue,
    fontSize: 17,
    fontWeight: 'bold',
  },
  msgBubble: {
    backgroundColor: '#26384a',
    padding: 15,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 30,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  msgBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: colors.lightBlue,
  },
  msgText: {
    fontSize: 16,
  },
  sendMessageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    // same can be accomplished with paddingVertical but
    // this gives better exp w keyboard:
    paddingTop: 30,
    marginBottom: 30,
    width: '100%',
    borderTopWidth: 0.25,
    borderTopColor: colors.lightBorder,
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    minHeight: 45,
    maxHeight: 100,
    width: '70%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.white,
  },
  sendMsgBtn: {
    marginLeft: 10,
    marginTop: 10,
  },
})
