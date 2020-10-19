import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { useIsFocused } from '@react-navigation/native'

import { getMe, logout } from '../redux'
import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const UserProfileInfo = ({ logout, me, authId, getMe }) => {
  const isFocused = useIsFocused()

  useEffect(() => {
    getMe(authId)
  }, [isFocused])

  let handleSubmit = () => {
    logout()
  }

  if (!me.user) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: me.user.profileImageUrl }}
          style={styles.profileImg}
        />
        <Text style={[defaultStyles.text]}>
          {me.user.firstName} {me.user.lastName}
        </Text>
        <Text style={[defaultStyles.text, styles.textMargin, styles.textBold]}>
          @{me.user.username}
        </Text>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.logoutBtn}
        >
          <Text style={[defaultStyles.smallText, styles.textBold]}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.followDataView}>
          <Text style={[defaultStyles.text, styles.textMargin]}>
            {me.followers.length} Followers
          </Text>
          <Text style={[defaultStyles.text, styles.textMargin]}>
            {me.following.length} Following
          </Text>
        </View>
      </View>
    )
  }
}

const mapState = (state) => ({
  me: state.user.me,
})

const mapDispatch = (dispatch) => ({
  logout: () => dispatch(logout()),
  getMe: (userId) => dispatch(getMe(userId)),
})

export default connect(mapState, mapDispatch)(UserProfileInfo)

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
