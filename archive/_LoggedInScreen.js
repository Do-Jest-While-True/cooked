// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createStackNavigator } from '@react-navigation/stack'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
// import colors from '../config/colors'
// import { StyleSheet } from 'react-native'
// import React from 'react'
// import {
//   FeedRecipesScreen,
//   AllRecipesScreen,
// } from '../screens/ExploreRecipesScreen'
// import RecipePostForm from '../screens/RecipePostForm'
// import RecipeScreen from '../screens/RecipeScreen'
// import UserProfileScreen from '../screens/UserProfileScreen'
// import { Entypo } from '@expo/vector-icons'
// import { FontAwesome } from '@expo/vector-icons'

// const Tab = createBottomTabNavigator()
// const Stack = createStackNavigator()
// const ExploreTab = createMaterialTopTabNavigator()

// const AllAndSingleRecipeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Feed Recipes"
//       component={AllRecipesScreen}
//       options={headerStyle}
//     />
//     <Stack.Screen
//       name="Recipe"
//       component={RecipeScreen}
//       options={headerStyle}
//     />
//   </Stack.Navigator>
// )

// const FeedAndSingleRecipeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Feed Recipes"
//       component={FeedRecipesScreen}
//       options={headerStyle}
//     />
//     <Stack.Screen
//       name="Recipe"
//       component={RecipeScreen}
//       options={headerStyle}
//     />
//   </Stack.Navigator>
// )

// const ProfileAndPostStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Profile"
//       component={UserProfileScreen}
//       options={{ ...headerStyle, headerShown: false }}
//     />
//     <Stack.Screen
//       name="Recipe"
//       component={RecipeScreen}
//       options={headerStyle}
//     />
//   </Stack.Navigator>
// )

// const ExploreTabs = () => (
//   <ExploreTab.Navigator>
//     <Tab.Screen name="Feed" component={FeedAndSingleRecipeStack} />
//     <Tab.Screen name="All" component={AllAndSingleRecipeStack} />
//   </ExploreTab.Navigator>
// )

// export const TabNavigator = () => (
//   <Tab.Navigator
//     tabBarOptions={{
//       showLabel: false,
//       style: styles.navbar,
//       activeTintColor: '#000',
//     }}
//   >
//     {/* <Tab.Screen
//       name="Welcome"
//       component={LoginSignup}
//       options={{
//         tabBarIcon: () => <Entypo name="home" size={35} color={colors.white} />,
//       }}
//     /> */}
//     <Tab.Screen
//       name="Explore"
//       component={ExploreAndSingleRecipeStack}
//       options={{
//         tabBarIcon: () => <Entypo name="bowl" size={35} color={colors.white} />,
//       }}
//     />
//     <Tab.Screen
//       name="New Recipe"
//       component={RecipePostForm}
//       options={{
//         tabBarIcon: () => (
//           <Entypo name="circle-with-plus" size={35} color={colors.white} />
//         ),
//       }}
//     />
//     <Tab.Screen
//       name="User Profile"
//       component={ProfileAndPostStack}
//       options={{
//         tabBarIcon: () => (
//           <FontAwesome name="user" size={35} color={colors.white} />
//         ),
//       }}
//     />
//   </Tab.Navigator>
// )

// const headerStyle = {
//   headerStyle: { backgroundColor: colors.main },
//   headerTintColor: colors.white,
// }

// const styles = StyleSheet.create({
//   navbar: {
//     backgroundColor: colors.main,
//     height: '9%',
//   },
// })
