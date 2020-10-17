import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { useScrollToTop } from '@react-navigation/native'

import UserProfileInfo from '../components/UserProfileInfo'
import UserProfileRecipes from '../components/UserProfileRecipes'
import { getMe } from '../redux'

import defaultStyles from '../config/defaultStyles'

const UserProfileScreen = ({ navigation, auth, getMe, me }) => {
  useEffect(() => {
    getMe(auth.id)
  }, [])

  // scroll to top onPress of tab bar icon
  const ref = React.useRef(null)
  useScrollToTop(ref)

  if (!me.user) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView ref={ref}>
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
