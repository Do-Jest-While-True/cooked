import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getAllThreads } from '../redux'
import defaultStyles from '../config/defaultStyles'

const AllThreadsScreen = ({ directMessages, getThreads }) => {
  useEffect(() => {
    getThreads()
  }, [])

  console.log('directMessages from allthreadsscreen=======', directMessages)
  // directMessages loads all of the other users info
  return (
    <View style={defaultStyles.container}>
      <FlatList
        data={directMessages}
        keyExtractor={(thread) => thread.id.toString()}
        renderItem={({ item }) => (
          <Text style={defaultStyles.text}>{item.user.username}</Text>
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

const styles = StyleSheet.create({})
