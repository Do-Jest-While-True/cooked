import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { useIsFocused } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import ProfileImageInput from '../components/ProfileImageInput'
import { getMe, logout } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const UserProfileInfo = ({ me, authId, getMe, nav }) => {
  const isFocused = useIsFocused()

  useEffect(() => {
    getMe(authId)
  }, [isFocused])

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
        <ProfileImageInput />
        <Image
          source={{ uri: me.user.profileImageUrl }}
          style={styles.profileImg}
        />
        <Text style={[defaultStyles.text, styles.textMargin, styles.textBold]}>
          @{me.user.username}
        </Text>
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
  settingsBtn: {
    alignSelf: 'flex-end',
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
