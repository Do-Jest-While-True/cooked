import React from 'react'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import { Login, Signup } from '../screens/AuthScreens'
import { TabNavigator } from './AppNav'
import WelcomeScreen from '../screens/WelcomeScreen'

import colors from '../config/colors'

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
  return (
    <React.Fragment>
      {user && user.id ? <TabNavigator /> : <LoginSignup />}
    </React.Fragment>
  )
}

const mapState = (state) => ({
  user: state.user,
})

export default connect(mapState, null)(AppScreen)

const headerStyle = {
  headerStyle: { backgroundColor: colors.medium },
  headerTintColor: colors.black,
}
