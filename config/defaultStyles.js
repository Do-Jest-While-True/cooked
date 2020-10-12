import { StyleSheet } from 'react-native'

import colors from './colors'

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.medium,
  },
  largeText: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
    color: colors.white,
  },
  text: {
    fontSize: 20,
    color: colors.white,
  },
})

export default defaultStyles
