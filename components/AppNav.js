import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'

import {
  FeedRecipesScreen,
  AllRecipesScreen,
} from '../screens/ExploreRecipesScreen'
import RecipePostForm from '../screens/RecipePostForm'
import RecipeScreen from '../screens/RecipeScreen'
import UserProfileScreen from '../screens/UserProfileScreen'
import ExtUserProfileScreen from '../screens/ExtUserProfileScreen'
import EditUserProfileScreen from '../screens/EditUserProfileScreen'
import AllThreadsScreen from '../screens/AllThreadsScreen'
import SearchScreen from '../screens/SearchScreen'
import SingleThreadScreen from '../screens/SingleThreadScreen'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'
import { startClock } from 'react-native-reanimated'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const ExploreTab = createMaterialTopTabNavigator()
const Drawer = createDrawerNavigator()

// STACKS / TABS // DRAWER
// ==============================================

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
        indicatorStyle: { backgroundColor: colors.pink },
        style: styles.exploreTab,
      }}
    >
      <Tab.Screen name="Feed" component={FeedAndSingleRecipeStack} />
      <Tab.Screen name="Global" component={AllAndSingleRecipeStack} />
    </ExploreTab.Navigator>
  </SafeAreaView>
)

const RecipeFormStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Add Recipe Post!"
      component={RecipePostForm}
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

const ProfileScreenDrawer = () => (
  <Drawer.Navigator drawerPosition="right">
    {/* // drawerContent={(props) => {
    //   return (
    //     <DrawerContentScrollView {...props}>
    //       <DrawerItemList {...props} />
    //       <DrawerItem
    //         label="Logout (not functioning)"
    //         onPress={() => console.log('logout clicked')}
    //       />
    //     </DrawerContentScrollView>
    //   )
    // }} */}
    <Drawer.Screen name="Your Profile" component={ProfileAndPostStack} />
    <Drawer.Screen name="Edit User Profile" component={EditUserProfileScreen} />
  </Drawer.Navigator>
)

const DirectMessageStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Messages"
      component={AllThreadsScreen}
      options={headerStyle}
    />
    <Stack.Screen
      name="Chat"
      component={SingleThreadScreen}
      options={headerStyle}
    />
  </Stack.Navigator>
)

// TAB BAR
// ==================================================

export const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: styles.navbar,
      activeTintColor: '#000',
      activeBackgroundColor: colors.mainFaded,
    }}
  >
    <Tab.Screen
      name="Explore"
      component={ExploreTabs}
      options={{
        tabBarIcon: () => <Entypo name="bowl" size={33} color={colors.white} />,
        unmountOnBlur: true,
      }}
      // creates dev warning when already at base stack
      listeners={({ navigation }) => ({
        tabPress: () => {
          navigation.dispatch(StackActions.popToTop())
        },
      })}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: () => (
          <FontAwesome name="search" size={33} color={colors.white} />
        ),
      }}
    />
    <Tab.Screen
      name="New Recipe"
      component={RecipeFormStack}
      options={{
        tabBarIcon: () => (
          <Entypo name="circle-with-plus" size={35} color={colors.white} />
        ),
      }}
    />
    <Tab.Screen
      name="All Messages"
      component={DirectMessageStack}
      options={{
        tabBarIcon: () => (
          <FontAwesome name="envelope" size={31} color={colors.white} />
        ),
        // tabBarBadge: 2,
      }}
    />
    <Tab.Screen
      name="User Profile"
      component={ProfileScreenDrawer}
      options={{
        tabBarIcon: () => (
          <FontAwesome name="user" size={36} color={colors.white} />
        ),
      }}
      // creates dev warning when already at base stack
      listeners={({ navigation }) => ({
        tabPress: () => {
          navigation.dispatch(StackActions.popToTop())
        },
      })}
    />
  </Tab.Navigator>
)

const headerStyle = {
  headerStyle: { backgroundColor: colors.main },
  headerTintColor: colors.white,
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: colors.main,
    height: '11%',
  },
  exploreTab: {
    backgroundColor: colors.main,
    color: colors.light,
  },
})
