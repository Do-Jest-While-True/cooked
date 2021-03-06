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
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { useScrollToTop } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

import ProfileImageInput from '../components/ProfileImageInput'
import { getMe, updateUsername } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const UserProfileScreen = ({
  navigation,
  auth,
  getMe,
  me,
  updateUsername,
  errorMsg,
}) => {
  const [newUsername, setNewUsername] = useState('')

  // for validations / messages:
  const [usernameFieldWarning, setUsernameFieldWarning] = useState(false)
  const [uploadMessage, setUploadMessage] = useState(false)

  useEffect(() => {
    getMe(auth.id)
  }, [])

  // console.log('errorMsg------------->', errorMsg);

  const handleSaveChanges = () => {
    // for validations:
    if (!newUsername) {
      return setUsernameFieldWarning(true)
    }
    // if (me.errorMsg.length) {
    // 	console.log(me.errorMsg);
    // 	return;
    // }
    // make axios call:
    updateUsername(newUsername)
    // reset fields:
    setNewUsername('')
    // reset warning messages:
    setUsernameFieldWarning(false)

    navigation.navigate('Your Profile')
  }

  // scroll to top onPress of tab bar icon
  const ref = React.useRef(null)
  useScrollToTop(ref)

  if (!me.user) {
    return <AppLoading />
  } else {
    return (
      <KeyboardAvoidingView
        style={defaultStyles.container}
        behavior="padding"
        keyboardVerticalOffset={20}
        enabled={Platform.OS === 'ios' ? true : false}
      >
        <SafeAreaView style={defaultStyles.container}>
          <ScrollView ref={ref}>
            <View style={styles.container}>
              <View style={styles.topRowBtnsView}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => {
                    setUploadMessage(false)
                    navigation.navigate('Your Profile')
                  }}
                >
                  <Ionicons
                    name="ios-arrow-back"
                    size={38}
                    color={colors.white}
                  />
                </TouchableOpacity>
                {/* SETTINGS BUTTON */}
                <Feather
                  name="settings"
                  size={28}
                  color={colors.white}
                  style={styles.settingsBtn}
                  onPress={() => navigation.openDrawer()}
                />
              </View>
              <View style={styles.formContentContainer}>
                {/* PROFILE IMAGE */}
                <Image
                  source={{ uri: me.user.profileImageUrl }}
                  style={styles.profileImg}
                />
                {/* EDIT PROFILE BTN & UPLOAD SUCCESS MSG*/}
                <ProfileImageInput
                  uploadMessage={uploadMessage}
                  setUploadMessage={setUploadMessage}
                />
                {/* USERNAME */}
                <View style={styles.usernameSection}>
                  <Text style={[defaultStyles.text, styles.textBold]}>
                    @{me.user.username}
                  </Text>
                  {usernameFieldWarning && (
                    <Text style={[defaultStyles.text, styles.warning]}>
                      Please Enter a New Username!
                    </Text>
                  )}
                  {/* USERNAME INPUT */}
                  <TextInput
                    placeholder="Enter Username"
                    placeholderTextColor={colors.lightGray}
                    style={[styles.formInput]}
                    clearButtonMode="always"
                    onSubmitEditing={handleSaveChanges}
                    onChangeText={(val) => {
                      setNewUsername(val)
                    }}
                    value={newUsername}
                  />
                  {/* SUBMIT USERNAME BTN */}
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={handleSaveChanges}
                  >
                    <Text style={[defaultStyles.text, styles.saveBtnText]}>
                      Submit Username
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}

const mapState = (state) => ({
  auth: state.auth,
  me: state.user.me,
  errorMsg: state.user.errorMsg,
})

const mapDispatch = (dispatch) => ({
  getMe: (myId) => dispatch(getMe(myId)),
  updateUsername: (newUsername) => dispatch(updateUsername(newUsername)),
})

export default connect(mapState, mapDispatch)(UserProfileScreen)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  topRowBtnsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
  backBtn: {
    marginLeft: 10,
  },
  settingsBtn: {
    alignSelf: 'flex-end',
  },
  formContentContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  profileImg: {
    width: 150,
    height: 150,
    borderWidth: 0.5,
    borderRadius: 75,
    borderColor: colors.lightBorder,
    marginVertical: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
  usernameSection: {
    marginTop: 50,
    paddingVertical: 50,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightBorder,
    width: '88%',
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 50,
    width: '80%',
    paddingHorizontal: 20,
    marginVertical: 20,
    fontSize: 20,
    color: colors.white,
  },
  saveBtn: {
    width: '80%',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
  },
  saveBtnText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  warning: {
    color: colors.pink,
    alignSelf: 'center',
    marginTop: 20,
  },
})
