import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { LogBox, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { store } from './redux/store'
import WelcomeScreen from './screens/WelcomeScreen'
import AllRecipesScreen from './screens/AllRecipesScreen'
import NewRecipeForm from './screens/NewRecipeForm'
import RecipeScreen from './screens/RecipeScreen'
import UserProfileScreen from './screens/UserProfileScreen'

import colors from './config/colors'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Explore"
      component={AllRecipesScreen}
      options={headerStyle}
    />
    <Stack.Screen
      name="Recipe"
      component={RecipeScreen}
      options={headerStyle}
    />
  </Stack.Navigator>
)

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: styles.navbar,
      activeTintColor: '#000',
    }}
  >
    <Tab.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        tabBarIcon: () => <Entypo name="home" size={35} color={colors.white} />,
      }}
    />
    <Tab.Screen
      name="Recipe"
      component={StackNavigator}
      options={{
        tabBarIcon: () => <Entypo name="bowl" size={35} color={colors.white} />,
      }}
    />
    <Tab.Screen
      name="New Recipe"
      component={NewRecipeForm}
      options={{
        tabBarIcon: () => <Entypo name="plus" size={35} color={colors.white} />,
      }}
    />
    <Tab.Screen
      name="User Profile"
      component={UserProfileScreen}
      options={{
        tabBarIcon: () => (
          <AntDesign name="user" size={35} color={colors.white} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
  LogBox.ignoreAllLogs() // Ignore all log notifications

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  )
}

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
