import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
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
  }

  return (
    <View style={[defaultStyles.container, styles.container]}>
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
    </View>
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
    borderBottomColor: colors.darkGray,
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
    // flex: -1,
    backgroundColor: '#26384a',
    padding: 15,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 30,
    maxWidth: '70%',
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
    marginVertical: 20,
    width: '100%',
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    minHeight: 45,
    maxHeight: 100,
    width: '70%',
    marginBottom: 10,
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
