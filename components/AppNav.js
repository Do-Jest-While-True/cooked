import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

import {
  FeedRecipesScreen,
  AllRecipesScreen,
} from '../screens/ExploreRecipesScreen'
import RecipePostForm from '../screens/RecipePostForm'
import RecipeScreen from '../screens/RecipeScreen'
import UserProfileScreen from '../screens/UserProfileScreen'
import ExtUserProfileScreen from '../screens/ExtUserProfileScreen'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const ExploreTab = createMaterialTopTabNavigator()

const AllAndSingleRecipeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Global Recipes"
      component={AllRecipesScreen}
      options={{ ...headerStyle, headerShown: false }}
    />
    {/* we actually may not want to hide this header below, but rather hide the tab switcher when you're stacked on top of it  */}
    <Stack.Screen
      name="Recipe"
      component={RecipeScreen}
      options={{ ...headerStyle, headerShown: false }}
    />
    <Stack.Screen
      name="Ext User Profile"
      component={ExtUserProfileScreen}
      options={{ ...headerStyle, headerShown: false }}
    />
  </Stack.Navigator>
)

const FeedAndSingleRecipeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Feed Recipes"
      component={FeedRecipesScreen}
      options={{ ...headerStyle, headerShown: false }}
    />
    {/* we actually may not want to hide this header below, but rather hide the tab switcher when you're stacked on top of it */}
    <Stack.Screen
      name="Recipe"
      component={RecipeScreen}
      options={{ ...headerStyle, headerShown: false }}
    />
    <Stack.Screen
      name="Ext User Profile"
      component={ExtUserProfileScreen}
      options={{ ...headerStyle, headerShown: false }}
    />
  </Stack.Navigator>
)

const ExploreTabs = () => (
  <SafeAreaView style={defaultStyles.container}>
    <ExploreTab.Navigator
      tabBarOptions={{
        labelStyle: { color: colors.white },
        indicatorStyle: { backgroundColor: colors.dark },
        style: styles.exploreTab,
      }}
    >
      <Tab.Screen name="Feed" component={FeedAndSingleRecipeStack} />
      <Tab.Screen name="Global" component={AllAndSingleRecipeStack} />
    </ExploreTab.Navigator>
  </SafeAreaView>
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
      component={ExploreTabs}
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
  exploreTab: {
    backgroundColor: colors.medium,
    color: colors.light,
  },
})
