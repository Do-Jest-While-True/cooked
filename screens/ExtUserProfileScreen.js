import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AppLoading } from 'expo'

import UserProfileInfo from '../components/UserProfileInfo'
import UserProfileRecipes from '../components/UserProfileRecipes'

import defaultStyles from '../config/defaultStyles'

const ExtUserProfileScreen = ({ route, navigation }) => {
  const user = route.params.userPlusFollows

  if (!user.user) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
          <UserProfileInfo nav={navigation} user={user} />
          <UserProfileRecipes nav={navigation} user={user.user} />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default ExtUserProfileScreen
