import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Dimensions } from 'react-native'
import { AppLoading } from 'expo'
import {
  CoveredByYourGrace_400Regular,
  useFonts,
} from '@expo-google-fonts/covered-by-your-grace'
import { TouchableOpacity } from 'react-native-gesture-handler'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const WelcomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    CoveredByYourGrace_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <View style={styles.welcomeHeadingView}>
          <Text style={styles.welcomeHeadingText}>Cook'd</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.submitBtn}
          >
            <Text style={styles.submitBtnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.submitBtn}
          >
            <Text style={styles.submitBtnText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

export default WelcomeScreen

const welcomeHeaderHeight = Dimensions.get('screen').height / 12
// would need to set navbar height by dimensions for super consistent results on WelcomeScreen

const styles = StyleSheet.create({
  welcomeHeadingView: {
    height: welcomeHeaderHeight,
    justifyContent: 'center',
  },
  welcomeHeadingText: {
    fontFamily: 'CoveredByYourGrace_400Regular',
    letterSpacing: 7,
    color: colors.white,
    fontSize: 30,
    textAlign: 'center',
  },
  navbar: {
    position: 'absolute',
    bottom: 40,
  },
  center: {
    marginTop: '35%',
  },
  submitBtn: {
    backgroundColor: colors.dark,
    borderRadius: 25,
    margin: 20,
    padding: 12,
  },
  submitBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
