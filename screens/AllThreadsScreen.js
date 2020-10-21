import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getAllThreads } from '../redux'

const AllThreadsScreen = ({ directMessages, getThreads }) => {
  useEffect(() => {
    getThreads()
  }, [])

  console.log('DMs from AllThreads React-----', directMessages)
  return (
    <View>
      <Text>All Thread Screen</Text>
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
