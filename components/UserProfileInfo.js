import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

import { logout } from '../redux'
import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const UserProfileInfo = ({ logout, user }) => {
  let handleSubmit = () => {
    logout()
  }

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
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.logoutBtn}>
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
}

const mapDispatch = (dispatch) => ({
  logout: () => dispatch(logout()),
})

export default connect(null, mapDispatch)(UserProfileInfo)

const styles = StyleSheet.create({
  container: {
    height: 375,
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
    backgroundColor: colors.pink,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
})
