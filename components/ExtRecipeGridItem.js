import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

import { oneThirdScreenWidth } from '../config/dimensions'

const ExtRecipeGridItem = ({ recipeId, imageUrl, nav }) => {
  return (
    // this is not working yet, you cannot yet click on an ext persons post item in their profile and stack that recipe on top of it
    <TouchableOpacity
      onPress={() =>
        nav.navigate('Ext User Profile', {
          screen: 'Recipe',
          params: { recipeId },
        })
      }
    >
      <Image source={{ uri: imageUrl }} style={styles.gridImg} />
    </TouchableOpacity>
  )
}

export default ExtRecipeGridItem

const styles = StyleSheet.create({
  gridImg: {
    width: '100%',
    height: oneThirdScreenWidth,
  },
})
