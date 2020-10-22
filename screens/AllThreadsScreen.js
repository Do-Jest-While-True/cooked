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
import { getAllThreads } from '../redux'
import { Entypo } from '@expo/vector-icons'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const AllThreadsScreen = ({ directMessages, getThreads }) => {
  const [displayNewMsgForm, setDisplayNewMsgForm] = useState(false)

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

  // console.log('dm -->', directMessages)
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
        <View style={styles.newMsgFormView}>
          <TextInput
            placeholder="Enter username"
            placeholderTextColor={colors.lightGray}
            style={[styles.formInput]}
            clearButtonMode="always"
            // onSubmitEditing={handleSaveChanges}
            // onChangeText={(val) => {
            // 	setNewUsername(val);
            // }}
            // value={newUsername}
          />
          <TouchableOpacity style={styles.startMsgBtn}>
            <Entypo name="new-message" size={28} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={directMessages}
        keyExtractor={(thread) => thread.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.singleThreadView}>
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
                {item.messages.length > 1 && 's'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const mapState = (state) => ({
  directMessages: state.directMessages,
})

const mapDispatch = (dispatch) => ({
  getThreads: () => dispatch(getAllThreads()),
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
    // THIS IS TEMPORARY -- NOT DYNAMIC:
    marginLeft: 40,
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 50,
    width: '60%',
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: colors.white,
    alignSelf: 'center',
  },

  startMsgBtn: {
    margin: 10,
  },
  singleThreadView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    borderTopColor: colors.lightGray,
    borderBottomColor: colors.lightGray,
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
