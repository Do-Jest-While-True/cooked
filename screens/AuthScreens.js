import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'

import { auth } from '../redux'
import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const AuthScreens = ({ name, getUser, auth, error }) => {
  // for validations:
  const [emailFieldWarning, setEmailFieldWarning] = useState(false)
  const [passwordFieldWarning, setPasswordFieldWarning] = useState(false)
  const [usernameFieldWarning, setUsernameFieldWarning] = useState(false)
  const [firstNameFieldWarning, setFirstNameFieldWarning] = useState(false)
  const [lastNameFieldWarning, setLastNameFieldWarning] = useState(false)

  const { control, handleSubmit, getValues } = useForm()

  const onSubmit = () => {
    const values = getValues()

    // for validations:
    if (!isEmail(values.email)) {
      return setEmailFieldWarning(true)
    }
    if (values.password.length < 8) {
      return setPasswordFieldWarning(true)
    }
    if (!values.username && name === 'signup') {
      return setUsernameFieldWarning(true)
    }
    if (!values.firstName && name === 'signup') {
      return setFirstNameFieldWarning(true)
    }
    if (!values.lastName && name === 'signup') {
      return setLastNameFieldWarning(true)
    }

    // login / signup
    getUser(values, name)

    // reset warning messages
    setEmailFieldWarning(false)
    setPasswordFieldWarning(false)
    setUsernameFieldWarning(false)
    setFirstNameFieldWarning(false)
    setLastNameFieldWarning(false)
  }

  // console.log('auth------->', auth);
  // console.log('unique msg------->', auth.uniqueEmailMsg);
  // console.log('error---->', error);

  return (
    <KeyboardAvoidingView
      style={defaultStyles.container}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.formContainer}>
            {name === 'signup' ? (
              <React.Fragment>
                {/* FIRST NAME ----------------------------------------- */}
                {firstNameFieldWarning && (
                  <Text style={[defaultStyles.text, styles.warning]}>
                    Please enter your first name!
                  </Text>
                )}
                <Controller
                  control={control}
                  render={({ onChange, value }) => (
                    <TextInput
                      style={styles.formInput}
                      placeholder="First Name"
                      placeholderTextColor={colors.lightGray}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="firstName"
                  defaultValue=""
                />
                {/* LAST NAME ----------------------------------------- */}
                {lastNameFieldWarning && (
                  <Text style={[defaultStyles.text, styles.warning]}>
                    Please enter your last name!
                  </Text>
                )}
                <Controller
                  control={control}
                  render={({ onChange, value }) => (
                    <TextInput
                      style={styles.formInput}
                      placeholder="Last Name"
                      placeholderTextColor={colors.lightGray}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="lastName"
                  defaultValue=""
                />
                {/* USERNAME ----------------------------------------- */}
                {usernameFieldWarning && (
                  <Text style={[defaultStyles.text, styles.warning]}>
                    Please enter your username!
                  </Text>
                )}
                <Controller
                  control={control}
                  render={({ onChange, value }) => (
                    <TextInput
                      style={styles.formInput}
                      placeholder="Username"
                      placeholderTextColor={colors.lightGray}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      clearButtonMode="always"
                    />
                  )}
                  name="username"
                  defaultValue=""
                />
              </React.Fragment>
            ) : null}
            {/* EMAIL ----------------------------------------- */}
            {/* empty email warning */}
            {emailFieldWarning && (
              <Text style={[defaultStyles.text, styles.warning]}>
                Please enter a valid email address!
              </Text>
            )}
            {/* non-unique email warning */}
            {/* {auth && <Text style={[ defaultStyles.text, styles.warning ]}>{auth}</Text>} */}
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="Email"
                  placeholderTextColor={colors.lightGray}
                  onChangeText={(value) => onChange(value)}
                  value={value.toLowerCase()}
                  clearButtonMode="always"
                />
              )}
              name="email"
              defaultValue=""
            />
            {/* PASSWORD ----------------------------------------- */}
            {passwordFieldWarning && (
              <Text style={[defaultStyles.text, styles.warning]}>
                Password must be at least 8 characters!
              </Text>
            )}
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <TextInput
                  style={styles.formInput}
                  placeholder="Password"
                  placeholderTextColor={colors.lightGray}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  clearButtonMode="always"
                  secureTextEntry={true}
                  onSubmitEditing={onSubmit}
                />
              )}
              name="password"
              defaultValue=""
            />
            {/* WORKING ON IT MESSAGE ----------------------------------------- */}
            {auth.isLoggingIn && (
              <Text style={[defaultStyles.text, styles.loggingInMsg]}>
                Working on it...
              </Text>
            )}
            {/* LOGIN / SIGN UP BTN ----------------------------------------- */}
            <View style={styles.submitBtnView}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.submitBtnText}>
                  {name === 'signup' ? 'Sign Up' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const mapLogin = (state) => ({
  name: 'login',
  displayName: 'Login',
  error: state.auth.error,
  auth: state.auth,
})

const mapSignup = (state) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.auth.error,
  auth: state.auth,
})

const mapDispatch = (dispatch) => ({
  getUser: (values, formName) => {
    return dispatch(auth(values, formName))
  },
})

export const Login = connect(mapLogin, mapDispatch)(AuthScreens)
export const Signup = connect(mapSignup, mapDispatch)(AuthScreens)

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
    backgroundColor: colors.main,
    marginTop: '20%',
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 50,
    width: '85%',
    paddingHorizontal: 20,
    marginVertical: 20,
    fontSize: 20,
    color: colors.white,
  },
  submitBtnView: {
    width: '85%',
  },
  submitBtn: {
    backgroundColor: colors.pink,
    borderRadius: 25,
    marginVertical: 40,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  submitBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  warning: {
    color: colors.pink,
    alignSelf: 'center',
  },
  loggingInMsg: {
    marginTop: 15,
  },
})
