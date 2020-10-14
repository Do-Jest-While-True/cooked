import React from 'react'
import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'

import { auth } from '../redux'
import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const AuthScreens = ({ name, getUser }) => {
  const { control, handleSubmit, getValues } = useForm()
  const onSubmit = () => {
    const values = getValues()
    getUser(values, name)
  }
  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.formInputView}>
        <Controller
          control={control}
          render={({ onChange, value }) => (
            <TextInput
              style={styles.formInput}
              placeholder="Email"
              placeholderTextColor={colors.lightGray}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ onChange, value }) => (
            <TextInput
              style={styles.formInput}
              placeholder="Password"
              placeholderTextColor={colors.lightGray}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        {name === 'signup' ? (
          <React.Fragment>
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
              rules={{ required: true }}
              defaultValue=""
            />
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
              rules={{ required: true }}
              defaultValue=""
            />
          </React.Fragment>
        ) : null}
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
    </SafeAreaView>
  )
}

const mapLogin = (state) => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error,
  user: state.user,
})

const mapSignup = (state) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error,
})

const mapDispatch = (dispatch) => ({
  getUser: (values, formName) => {
    return dispatch(auth(values, formName))
  },
})

export const Login = connect(mapLogin, mapDispatch)(AuthScreens)
export const Signup = connect(mapSignup, mapDispatch)(AuthScreens)

const styles = StyleSheet.create({
  formInputView: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    marginTop: '33%',
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 50,
    width: '90%',
    paddingHorizontal: 20,
    marginVertical: 20,
    fontSize: 20,
    color: colors.white,
  },
  submitBtnView: {
    width: '90%',
  },
  submitBtn: {
    backgroundColor: colors.dark,
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
})
