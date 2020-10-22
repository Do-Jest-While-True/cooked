import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid'
import { useIsFocused } from '@react-navigation/native'

import { getMyRecipes } from '../redux'
import ExtRecipeGridItem from './ExtRecipeGridItem'
import { oneThirdScreenWidth } from '../config/dimensions'

const ExtUserProfileRecipes = ({ user, myRecipes, getMyRecipes, nav }) => {
  const isFocused = useIsFocused()

  useEffect(() => {
    getMyRecipes(user.id)
  }, [isFocused])

  return (
    <FlatGrid
      // this # is determining how many grid elements can fit in one row:
      // actual width and height can overflow, those are determined their component style
      itemDimension={oneThirdScreenWidth}
      spacing={0}
      data={myRecipes}
      renderItem={({ item }) => {
        return (
          <ExtRecipeGridItem
            nav={nav}
            recipeId={item.id}
            imageUrl={item.imageUrl}
          />
        )
      }}
    />
  )
}

const mapState = (state) => ({
  myRecipes: state.myRecipes,
})

const mapDispatch = (dispatch) => ({
  getMyRecipes: (userId) => dispatch(getMyRecipes(userId)),
})

export default connect(mapState, mapDispatch)(ExtUserProfileRecipes)
