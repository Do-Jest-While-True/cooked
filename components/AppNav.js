import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
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

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const ExploreTab = createMaterialTopTabNavigator()
const Drawer = createDrawerNavigator()

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
  <Drawer.Navigator
    drawerPosition="right"
    drawerContent={(props) => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout (not functioning)"
            onPress={() => console.log('logout clicked')}
          />
        </DrawerContentScrollView>
      )
    }}
  >
    <Drawer.Screen name="Your Profile" component={ProfileAndPostStack} />
    <Drawer.Screen name="Edit User Profile" component={EditUserProfileScreen} />
  </Drawer.Navigator>
)

const DirectMessageStack = () => {
  ;<Stack.Navigator>
    <Stack.Screen
      name="All Messages"
      component={AllThreadsScreen}
      options={headerStyle}
    />
  </Stack.Navigator>
}

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
        unmountOnBlur: true,
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
      component={ProfileScreenDrawer}
      options={{
        tabBarIcon: () => (
          <FontAwesome name="user" size={35} color={colors.white} />
        ),
      }}
    />
    <Tab.Screen
      name="All Messages"
      component={DirectMessageStack}
      options={{
        tabBarIcon: () => (
          <FontAwesome name="envelope" size={35} color={colors.white} />
        ),
      }}
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
