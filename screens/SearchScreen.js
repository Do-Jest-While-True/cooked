import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const SearchScreen = ({}) => {
  return (
    <View style={[defaultStyles.container, styles.container]}>
      <Text style={defaultStyles.text}>Search is not yet available...</Text>
      <Text style={[defaultStyles.text, styles.comeBackMsg]}>
        Come Back Soon!
      </Text>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  comeBackMsg: {
    color: colors.lightBlue,
    marginTop: 10,
    fontWeight: 'bold',
  },
})
