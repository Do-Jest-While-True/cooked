import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { getAllThreads } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const AllThreadsScreen = ({ directMessages, getThreads }) => {
  useEffect(() => {
    getThreads()
  }, [])

  console.log('dm -->', directMessages)
  return (
    <View style={defaultStyles.container}>
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
  singleThreadView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    // borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    // borderTopColor: colors.lightGray,
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
