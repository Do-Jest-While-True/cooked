import React from 'react'
import { TabNavigator } from '../components/LoggedInView'
import { connect } from 'react-redux'
import { Login, Signup } from '../components/AuthForm'
import WelcomeScreen from './WelcomeScreen'
import colors from '../config/colors'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export const LoginSignup = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={headerStyle}
    />
    <Stack.Screen name="Login" component={Login} options={headerStyle} />
    <Stack.Screen name="Signup" component={Signup} options={headerStyle} />
  </Stack.Navigator>
)

export const AppScreen = ({ user }) => {
  return <>{user && user.id ? <TabNavigator /> : <LoginSignup />}</>
}

const mapState = (state) => ({
  user: state.user,
})

export default connect(mapState, null)(AppScreen)

const headerStyle = {
  headerStyle: { backgroundColor: colors.medium },
  headerTintColor: colors.black,
}
