import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

const RecipeGridItem = ({ id, imageUrl, nav }) => {
  return (
    <TouchableOpacity onPress={() => nav.navigate('Recipe', { id })}>
      <Image
        source={{
          uri: tempImgUrl,
        }}
        style={styles.gridImg}
      />
    </TouchableOpacity>
  )
}

export default RecipeGridItem

const styles = StyleSheet.create({
  gridImg: {
    width: '100%',
    height: '100%',
  },
})

const tempImgUrl =
  'https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1579721909133-R2KSZ8VGDGBI90DYATBK/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/header4.jpg?format=2500w'
