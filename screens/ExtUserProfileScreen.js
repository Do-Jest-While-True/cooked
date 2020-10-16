import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AppLoading } from 'expo'

import ExtUserProfileInfo from '../components/ExtUserProfileInfo'
import UserProfileRecipes from '../components/UserProfileRecipes'

import defaultStyles from '../config/defaultStyles'

const ExtUserProfileScreen = ({ route, navigation }) => {
  if (!route.params.user.user) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
          <ExtUserProfileInfo nav={navigation} user={route.params.user} />
          <UserProfileRecipes nav={navigation} user={route.params.user.user} />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default ExtUserProfileScreen
