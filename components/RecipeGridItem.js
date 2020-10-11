import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

const RecipeGridItem = ({ id, imageUrl, nav }) => {
  return (
    <TouchableOpacity onPress={() => nav.navigate('Recipe', { id })}>
      <Image source={{ uri: imageUrl }} style={styles.gridImg} />
    </TouchableOpacity>
  )
}

export default RecipeGridItem

const styles = StyleSheet.create({
  gridImg: {
    // use Dimension const declared in parent
    height: 125,
  },
})
