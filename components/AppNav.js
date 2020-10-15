import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

import AllRecipesScreen from '../screens/AllRecipesScreen'
import RecipePostForm from '../screens/RecipePostForm'
import RecipeScreen from '../screens/RecipeScreen'
import UserProfileScreen from '../screens/UserProfileScreen'
import colors from '../config/colors'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const ExploreAndSingleRecipeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="All Recipes"
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

const ProfileAndPostStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={UserProfileScreen}
      options={{ ...headerStyle, headerShown: false }}
    />
    <Stack.Screen
      name="Recipe"
      component={RecipeScreen}
      options={headerStyle}
    />
  </Stack.Navigator>
)

export const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: styles.navbar,
      activeTintColor: '#000',
    }}
  >
    <Tab.Screen
      name="Explore"
      component={ExploreAndSingleRecipeStack}
      options={{
        tabBarIcon: () => <Entypo name="bowl" size={35} color={colors.white} />,
      }}
    />
    <Tab.Screen
      name="New Recipe"
      component={RecipePostForm}
      options={{
        tabBarIcon: () => (
          <Entypo name="circle-with-plus" size={35} color={colors.white} />
        ),
      }}
    />
    <Tab.Screen
      name="User Profile"
      component={ProfileAndPostStack}
      options={{
        tabBarIcon: () => (
          <FontAwesome name="user" size={35} color={colors.white} />
        ),
      }}
    />
  </Tab.Navigator>
)

const headerStyle = {
  headerStyle: { backgroundColor: colors.medium },
  headerTintColor: colors.black,
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: colors.medium,
    height: '11%',
  },
})
