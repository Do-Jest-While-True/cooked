import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import defaultStyles from '../config/defaultStyles'

const SearchScreen = ({}) => {
  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={defaultStyles.text}>Search is not yet available!</Text>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
