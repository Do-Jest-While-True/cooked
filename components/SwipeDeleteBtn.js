import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { deleteThread } from '../redux'

import colors from '../config/colors'

const SwipeDeleteBtn = ({ threadId, deleteThread }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => deleteThread(threadId)}
    >
      <Text style={styles.text}>Delete</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pink,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
    padding: 50,
  },
})

const mapDispatch = (dispatch) => ({
  deleteThread: (threadId) => dispatch(deleteThread(threadId)),
})

export default connect(null, mapDispatch)(SwipeDeleteBtn)
