import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Login, Signup } from '../screens/AuthScreens'
import WelcomeScreen from '../screens/WelcomeScreen'

import colors from '../config/colors'

const Stack = createStackNavigator()

export const LoginSignup = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ ...headerStyle, headerShown: false }}
    />
    <Stack.Screen name="Login" component={Login} options={headerStyle} />
    <Stack.Screen name="Signup" component={Signup} options={headerStyle} />
  </Stack.Navigator>
)

const headerStyle = {
  headerStyle: { backgroundColor: colors.main },
  headerTintColor: colors.white,
}
