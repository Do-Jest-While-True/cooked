import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native'
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
      <SafeAreaView style={[defaultStyles.container, styles.container]}>
        <View>
          <Image
            source={require('../assets/cookedlogo.png')}
            style={styles.logo}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
  },
  logo: {
    width: 275,
    height: 275,
    alignSelf: 'center',
  },
  btn: {
    backgroundColor: colors.pink,
    borderRadius: 25,
    margin: 25,
    padding: 12,
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
