import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { useScrollToTop } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import ProfileImageInput from '../components/ProfileImageInput'
import { getMe, updateUsername } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const UserProfileScreen = ({ navigation, auth, getMe, me, updateUsername }) => {
  const [newUsername, setNewUsername] = useState('')

  useEffect(() => {
    getMe(auth.id)
  }, [])

  const handleSaveChanges = () => {
    updateUsername(newUsername)
    navigation.navigate('Your Profile')
  }

  // scroll to top onPress of tab bar icon
  const ref = React.useRef(null)
  useScrollToTop(ref)

  if (!me.user) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView ref={ref}>
          <View style={styles.container}>
            {/* SETTINGS BUTTON */}
            <Feather
              name="settings"
              size={28}
              color={colors.white}
              style={styles.settingsBtn}
              onPress={() => navigation.openDrawer()}
            />
            {/* FORM CONTENT */}
            <View style={styles.formContentContainer}>
              <Image
                source={{ uri: me.user.profileImageUrl }}
                style={styles.profileImg}
              />
              <ProfileImageInput />
              <View style={styles.usernameSection}>
                <Text
                  style={[
                    defaultStyles.text,
                    styles.textMargin,
                    styles.textBold,
                  ]}
                >
                  @{me.user.username}
                </Text>
                <TextInput
                  placeholder="Enter Username"
                  placeholderTextColor={colors.lightGray}
                  style={[styles.formInput]}
                  clearButtonMode="always"
                  onChangeText={(val) => {
                    setNewUsername(val)
                  }}
                  value={newUsername}
                />
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={handleSaveChanges}
                >
                  <Text style={[defaultStyles.text, styles.saveBtnText]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapState = (state) => ({
  auth: state.auth,
  me: state.user.me,
})

const mapDispatch = (dispatch) => ({
  getMe: (myId) => dispatch(getMe(myId)),
  updateUsername: (newUsername) => dispatch(updateUsername(newUsername)),
})

export default connect(mapState, mapDispatch)(UserProfileScreen)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
  },
  settingsBtn: {
    alignSelf: 'flex-end',
  },
  formContentContainer: {
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  profileImg: {
    width: 150,
    height: 150,
    borderWidth: 0.5,
    borderRadius: 75,
    borderColor: colors.white,
    marginVertical: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
  usernameSection: {
    marginTop: 50,
    paddingTop: 50,
    alignItems: 'center',
    borderTopWidth: 0.25,
    borderTopColor: colors.white,
    width: '88%',
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 50,
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
    fontSize: 20,
    color: colors.white,
  },
  saveBtn: {
    width: '100%',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.pink,
  },
  saveBtnText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
