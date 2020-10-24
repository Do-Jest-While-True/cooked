import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

import { followUser, gotUser, unfollowUser } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

// there is some redundancy here: user is the external user being passed down from parent, userToFollow is the same user but is mapped to props directly from store so that # followers is directly connected to store and rerenders the # after clicking follow/unfollow -- this component can be refactored to only use the user mapped from store
const ExtUserProfileInfo = ({
  user,
  me,
  followUser,
  getUser,
  userToFollow,
  unfollowUser,
}) => {
  const handleFollow = async () => {
    await followUser(user.user.id)
    await getUser(user.user.id)
  }

  const handleUnfollow = async () => {
    await unfollowUser(user.user.id)
    await getUser(user.user.id)
  }

  let amFollowingUser = userToFollow.followers.some(
    (follower) => follower.followedById === me.user.id
  )

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.user.profileImageUrl }}
        style={styles.profileImg}
      />
      <Text style={[defaultStyles.text]}>
        {user.user.firstName} {user.user.lastName}
      </Text>
      <Text style={[defaultStyles.text, styles.textMargin, styles.textBold]}>
        @{user.user.username}
      </Text>
      {/* first conditional (left side of &&) says if I clicked into my own post from global feed don't display any follow/unfollow button */}
      {/* ternary op (right side of &&) is checking whether or not to display follow or unfollow btn */}
      {user.user.username !== me.user.username &&
        (amFollowingUser ? (
          <TouchableOpacity
            onPress={() => handleUnfollow()}
            style={styles.followBtn}
          >
            <Text style={[defaultStyles.smallText, styles.textBold]}>
              Unfollow
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleFollow()}
            style={styles.followBtn}
          >
            <Text style={[defaultStyles.smallText, styles.textBold]}>
              Follow
            </Text>
          </TouchableOpacity>
        ))}
      <View style={styles.followDataView}>
        <Text style={[defaultStyles.text, styles.textMargin]}>
          {userToFollow.followers.length} Followers
        </Text>
        <Text style={[defaultStyles.text, styles.textMargin]}>
          {userToFollow.following.length} Following
        </Text>
      </View>
    </View>
  )
}

const mapState = (state) => ({
  userToFollow: state.user.user,
})

const mapDispatch = (dispatch) => ({
  followUser: (userToFollowId) => dispatch(followUser(userToFollowId)),
  getUser: (userId) => dispatch(gotUser(userId)),
  unfollowUser: (userId) => dispatch(unfollowUser(userId)),
})

export default connect(mapState, mapDispatch)(ExtUserProfileInfo)

const styles = StyleSheet.create({
  container: {
    height: 375,
    borderBottomWidth: 0.25,
    borderBottomColor: colors.lightBorder,
    alignItems: 'center',
    padding: 15,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderWidth: 0.5,
    borderRadius: 75,
    borderColor: colors.white,
    marginBottom: 10,
  },
  textMargin: {
    marginVertical: 18,
  },
  textBold: {
    fontWeight: 'bold',
  },
  followDataView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  followBtn: {
    backgroundColor: colors.lightBlue,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
})
