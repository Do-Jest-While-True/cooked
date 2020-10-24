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
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'

import SwipeDeleteBtn from '../components/SwipeDeleteBtn'
import { getAllThreads, postNewThread } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

const AllThreadsScreen = ({
  directMessages,
  getThreads,
  navigation,
  auth,
  postNewThread,
}) => {
  const [refreshing, setRefreshing] = React.useState(false)
  const [displayNewMsgForm, setDisplayNewMsgForm] = useState(false)
  const [emptyWarning, setEmptyWarning] = useState(false)
  const [usernameInput, setUsernameInput] = useState('')

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(1000).then(() => setRefreshing(false))
    getThreads()
  }, [])

  useEffect(() => {
    getThreads()
  }, [])

  const toggleNewMsgForm = () => {
    if (displayNewMsgForm) {
      setDisplayNewMsgForm(false)
    } else {
      setDisplayNewMsgForm(true)
    }
  }

  // needs a 500 frontend message
  const handleStartMessage = () => {
    // prevent no input:
    if (!usernameInput) {
      return setEmptyWarning(true)
    }
    // prevent duplicate thread and jump to existing if exists
    let existingThreadWithUser = directMessages.find(
      (thread) => thread.user.username === usernameInput
    )
    if (existingThreadWithUser) {
      navigation.navigate('Chat', { thread: existingThreadWithUser })
      existingThreadWithUser = null
      setUsernameInput('')
      setEmptyWarning(false)
      return
    }

    // post and render new thread:
    postNewThread(auth.id, usernameInput)

    // reset vars
    setUsernameInput('')
    setEmptyWarning(false)
  }

  const handleNavToSingleThread = (thread) => {
    navigation.navigate('Chat', { thread })
  }

  return (
    <View style={defaultStyles.container}>
      {/* OPEN NEW MSG FORM BTN */}
      <TouchableOpacity style={styles.newMsgBtn} onPress={toggleNewMsgForm}>
        <Text style={[defaultStyles.smallText, styles.newMsgBtnText]}>
          New Message
        </Text>
      </TouchableOpacity>
      {/* NEW MESSAGE FORM */}
      {displayNewMsgForm && (
        <View>
          {emptyWarning && (
            <Text style={[defaultStyles.smallText, styles.warningMsg]}>
              Enter username to start message!
            </Text>
          )}
          <View style={styles.newMsgFormView}>
            <TextInput
              placeholder="Enter username"
              placeholderTextColor={colors.lightGray}
              style={[styles.formInput]}
              clearButtonMode="always"
              onSubmitEditing={handleStartMessage}
              onChangeText={(val) => {
                setUsernameInput(val)
              }}
              value={usernameInput}
            />
            <TouchableOpacity
              style={styles.startMsgBtn}
              onPress={handleStartMessage}
            >
              <Entypo name="new-message" size={28} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* MESSAGE LIST: */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.white}
          />
        }
        data={directMessages}
        keyExtractor={(thread) => thread.id.toString()}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => <SwipeDeleteBtn threadId={item.id} />}
            onSwipeableRightOpen={() => console.log('delete opened')}
          >
            <TouchableOpacity
              style={styles.singleThreadView}
              onPress={() => handleNavToSingleThread(item)}
            >
              <Image
                source={{ uri: item.user.profileImageUrl }}
                style={styles.profileImage}
              />
              <View>
                <Text style={defaultStyles.text}>
                  {item.user.firstName} {item.user.lastName}
                </Text>
                <Text style={[defaultStyles.text, styles.username]}>
                  @{item.user.username}
                </Text>
                <Text style={defaultStyles.smallText}>
                  {item.messages.length} message
                  {(item.messages.length < 1 && 's') ||
                    (item.messages.length > 1 && 's')}
                </Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </View>
  )
}

const mapState = (state) => ({
  auth: state.auth,
  directMessages: state.directMessages,
})

const mapDispatch = (dispatch) => ({
  getThreads: () => dispatch(getAllThreads()),
  postNewThread: (myId, username) => dispatch(postNewThread(myId, username)),
})

export default connect(mapState, mapDispatch)(AllThreadsScreen)

const styles = StyleSheet.create({
  newMsgBtn: {
    alignSelf: 'center',
    marginVertical: 30,
    width: '40%',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.pink,
  },
  newMsgBtnText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  newMsgFormView: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: colors.lightBorder,
    borderBottomWidth: 0.25,
    // THIS IS TEMPORARY -- NOT DYNAMIC:
    paddingLeft: 45,
  },
  warningMsg: {
    textAlign: 'center',
    marginBottom: 20,
    color: colors.pink,
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 40,
    width: '60%',
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: colors.white,
    alignSelf: 'center',
    textAlign: 'center',
  },

  startMsgBtn: {
    // THIS IS TEMPORARY -- NOT DYNAMIC:
    margin: 12,
    marginTop: 5,
  },
  singleThreadView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    borderTopColor: colors.lightBorder,
    borderBottomColor: colors.lightBorder,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 15,
  },
  username: {
    marginVertical: 10,
    color: colors.lightBlue,
    fontSize: 17,
    fontWeight: 'bold',
  },
})
