import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

import UserProfileInfo from '../components/UserProfileInfo'
import UserProfileRecipes from '../components/UserProfileRecipes'

import defaultStyles from '../config/defaultStyles'
import { gotUser } from '../redux'

const UserProfileScreen = ({ navigation, user, gotUser }) => {
  useEffect(() => {
    gotUser()
  }, [])

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

const mapState = (state) => ({
  auth: state.auth,
  user: state.user.user,
})

const mapDispatch = (dispatch) => ({
  gotUser: (userId) => dispatch(gotUser(userId)),
})

export default connect(mapState, mapDispatch)(UserProfileScreen)
