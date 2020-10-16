import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

import UserProfileInfo from '../components/UserProfileInfo'
import UserProfileRecipes from '../components/UserProfileRecipes'

import defaultStyles from '../config/defaultStyles'
import { getMe } from '../redux'

const UserProfileScreen = ({ navigation, auth, getMe, me }) => {
  useEffect(() => {
    getMe(auth.id)
  }, [])

  if (!me.user) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
          <UserProfileInfo nav={navigation} user={me} />
          <UserProfileRecipes nav={navigation} user={me.user} />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapState = (state) => ({
  auth: state.auth,
  me: state.user.me,
})

const mapDispatch = (dispatch) => ({
  getMe: (myId) => dispatch(getMe(myId)),
})

export default connect(mapState, mapDispatch)(UserProfileScreen)
