import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

import { oneThirdScreenWidth } from '../config/dimensions'

const RecipeGridItem = ({ recipeId, imageUrl, nav }) => {
  return (
    // 'Explore' is the root of the nested Stack.Screens, 'Recipe' is the target Stack.Screen and 'id' is just being passed down through route.params.id (because RecipeScreen expects & requires it)
    <TouchableOpacity
      onPress={() =>
        nav.navigate('User Profile', { screen: 'Recipe', params: { recipeId } })
      }
    >
      <Image source={{ uri: imageUrl }} style={styles.gridImg} />
    </TouchableOpacity>
  )
}

export default RecipeGridItem

const styles = StyleSheet.create({
  gridImg: {
    width: '100%',
    height: oneThirdScreenWidth,
  },
})
