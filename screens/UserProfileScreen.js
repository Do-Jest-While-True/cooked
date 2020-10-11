import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import UserProfileInfo from '../components/UserProfileInfo'
import UserProfileRecipes from '../components/UserProfileRecipes'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const UserProfileScreen = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <UserProfileInfo />
      <UserProfileRecipes />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default UserProfileScreen
