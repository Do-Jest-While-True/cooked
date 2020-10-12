import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'

import { auth } from '../redux'
import colors from '../config/colors'

const AuthForm = ({ name, getUser }) => {
  const { control, handleSubmit, getValues } = useForm()
  const onSubmit = () => {
    const values = getValues()
    getUser(values, 'login')
  }
  return (
    <View style={styles.formInputView}>
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <TextInput
            style={styles.formInput}
            placeholder="Email"
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
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      {name === 'signup' ? (
        <>
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.formInput}
                placeholder="First Name"
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
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="lastName"
            rules={{ required: true }}
            defaultValue=""
          />
        </>
      ) : null}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapLogin = (state) => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error,
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

export default connect(mapLogin, mapDispatch)(AuthForm)
// export default connect(mapSignup, mapDispatch)(AuthForm)

const styles = StyleSheet.create({
  formInputView: {
    flex: 1,
    alignItems: 'center',
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 50,
    width: '88%',
    paddingHorizontal: 20,
    marginVertical: 20,
    marginRight: 15,
    fontSize: 20,
  },
  submitBtn: {
    backgroundColor: colors.dark,
    borderRadius: 25,
    margin: 20,
    padding: 12,
  },
  submitBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
