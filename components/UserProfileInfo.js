import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

import { logout, gotUser } from '../redux'
import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

// need to render # followers and following
// need to render THIS users recipes only here

const UserProfileInfo = ({ logout, gotUser, user, auth }) => {
  useEffect(() => {
    gotUser(auth.id)
  }, [])

  let handleSubmit = () => {
    logout()
  }

  if (user.user) {
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
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.logoutBtn}
        >
          <Text style={[defaultStyles.smallText, styles.textBold]}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.followDataView}>
          <Text style={[defaultStyles.text, styles.textMargin]}>
            {user.followers.length} Followers
          </Text>

          <Text style={[defaultStyles.text, styles.textMargin]}>
            {user.following.length} Following
          </Text>
        </View>
      </View>
    )
  } else {
    return <View />
  }
}

const mapState = (state) => ({
  user: state.user.user,
  auth: state.auth,
})

const mapDispatch = (dispatch) => ({
  logout: () => dispatch(logout()),
  gotUser: (userId) => dispatch(gotUser(userId)),
})

export default connect(mapState, mapDispatch)(UserProfileInfo)

const styles = StyleSheet.create({
  container: {
    height: '55%',
    borderBottomWidth: 0.25,
    borderBottomColor: colors.white,
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
  logoutBtn: {
    backgroundColor: colors.dark,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
})
