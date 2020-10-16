import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

import ExtUserProfileInfo from '../components/ExtUserProfileInfo'
import ExtUserProfileRecipes from '../components/ExtUserProfileRecipes'
import { getMe } from '../redux'

import defaultStyles from '../config/defaultStyles'

const ExtUserProfileScreen = ({ route, navigation, auth, getMe, me }) => {
  useEffect(() => {
    getMe(auth.id)
  }, [])

  if (!route.params.user.user) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
          <ExtUserProfileInfo
            nav={navigation}
            user={route.params.user}
            me={me}
          />
          <ExtUserProfileRecipes
            nav={navigation}
            user={route.params.user.user}
          />
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

export default connect(mapState, mapDispatch)(ExtUserProfileScreen)
