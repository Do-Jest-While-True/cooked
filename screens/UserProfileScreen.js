import React from 'react'
import { SafeAreaView } from 'react-native'

import UserProfileInfo from '../components/UserProfileInfo'
import UserProfileRecipes from '../components/UserProfileRecipes'

import defaultStyles from '../config/defaultStyles'

const UserProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <UserProfileInfo nav={navigation} />
      <UserProfileRecipes nav={navigation} />
    </SafeAreaView>
  )
}

export default UserProfileScreen
