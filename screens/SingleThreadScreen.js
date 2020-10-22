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

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'
import { color } from 'react-native-reanimated'

const SingleThreadScreen = ({ directMessages, getThreads, me, route }) => {
  // useEffect(() => {
  // 	getThreads();
  // }, []);

  console.log('messages-->', route.params.messages)
  const messages = route.params.messages
  // console.log('dm -->', directMessages);
  // console.log('-----------------------------------');
  console.log('me.user -->', me.user)
  // console.log('-----------------------------------');

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.sentBy === me.user.id
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
    </View>
  )
}

const mapState = (state) => ({
  me: state.user.me,
  directMessages: state.directMessages,
})

const mapDispatch = (dispatch) => ({
  getThreads: () => dispatch(getAllThreads()),
})

export default connect(mapState, mapDispatch)(SingleThreadScreen)

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  msgBubble: {
    backgroundColor: '#31465c',
    padding: 15,
    paddingHorizontal: 20,
    margin: 13,
    borderRadius: 30,
    maxWidth: '70%',
  },
  msgBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: colors.lightBlue,
  },
  msgText: {
    // textAlign: 'center'
  },
  test: {
    backgroundColor: 'red',
  },
})
