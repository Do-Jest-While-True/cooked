import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { useIsFocused } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import { getMe, logout } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const UserProfileInfo = ({ logout, me, authId, getMe, nav }) => {
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
        {/* SETTINGS BUTTON */}
        <Feather
          name="settings"
          size={28}
          color={colors.white}
          style={styles.settingsBtn}
          onPress={() => nav.openDrawer()}
        />
        {/* PROFILE IMAGE */}
        <Image
          source={{ uri: me.user.profileImageUrl }}
          style={styles.profileImg}
        />
        {/* FIRST LAST */}
        <Text style={[defaultStyles.text]}>
          {me.user.firstName} {me.user.lastName}
        </Text>
        {/* USERNAME */}
        <Text style={[defaultStyles.text, styles.textMargin, styles.textBold]}>
          @{me.user.username}
        </Text>
        {/* LOGOUT BTN */}
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.logoutBtn}
        >
          <Text style={[defaultStyles.smallText, styles.textBold]}>Logout</Text>
        </TouchableOpacity>
        {/* FOLLOW STATS */}
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
  },
  settingsBtn: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 10,
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
