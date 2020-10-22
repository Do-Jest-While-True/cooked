import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { AppLoading } from 'expo'

import { getThread, postNewMessage } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const SingleThreadScreen = ({
  route,
  postNewMessage,
  getThread,
  singleThread,
  auth,
}) => {
  const [messageInput, setMessageInput] = useState('')

  const threadId = route.params.thread.id
  const otherUser = route.params.thread.user

  useEffect(() => {
    getThread(threadId)
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

  // this conditional will need to be rethought out once we have the new message button working -- conditional could just wrap the FlatList????
  if (!singleThread.length) {
    return <AppLoading />
  } else {
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
        <FlatList
          data={singleThread}
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
}

const mapState = (state) => ({
  auth: state.auth,
  singleThread: state.singleThread,
})

const mapDispatch = (dispatch) => ({
  getThread: (threadId) => dispatch(getThread(threadId)),
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
