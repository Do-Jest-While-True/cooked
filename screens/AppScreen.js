import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { TabNavigator } from '../components/LoggedInScreen'
import { connect } from 'react-redux'
import { Login, Signup } from '../components/AuthForm'
import WelcomeScreen from './WelcomeScreen'
import colors from '../config/colors'
import { LogBox, StyleSheet } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator()
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

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: colors.medium,
    height: '9%',
  },
})
