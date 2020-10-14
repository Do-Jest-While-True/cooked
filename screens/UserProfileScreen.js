import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import UserProfileInfo from '../components/UserProfileInfo'
import UserProfileRecipes from '../components/UserProfileRecipes'

import defaultStyles from '../config/defaultStyles'

const UserProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <ScrollView>
        <UserProfileInfo nav={navigation} />
        <UserProfileRecipes nav={navigation} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserProfileScreen
