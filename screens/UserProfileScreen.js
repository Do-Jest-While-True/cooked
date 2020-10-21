import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { useScrollToTop } from '@react-navigation/native'

import UserProfileInfo from '../components/UserProfileInfo'
import UserProfileRecipes from '../components/UserProfileRecipes'

import defaultStyles from '../config/defaultStyles'

const UserProfileScreen = ({ navigation, auth }) => {
  // scroll to top onPress of tab bar icon
  const ref = React.useRef(null)
  useScrollToTop(ref)

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ScrollView ref={ref}>
        <UserProfileInfo nav={navigation} authId={auth.id} />
        <UserProfileRecipes nav={navigation} authId={auth.id} />
      </ScrollView>
    </SafeAreaView>
  )
}

const mapState = (state) => ({
  auth: state.auth,
})

export default connect(mapState)(UserProfileScreen)
