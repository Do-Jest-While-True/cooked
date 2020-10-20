import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid'
import { useIsFocused } from '@react-navigation/native'

import { getMyRecipes } from '../redux'
import RecipeGridItem from './RecipeGridItem'
import { oneThirdScreenWidth } from '../config/dimensions'

const UserProfileRecipes = ({ user, myRecipes, getMyRecipes, nav }) => {
  const isFocused = useIsFocused()

  useEffect(() => {
    ;(async () => await getMyRecipes(user.id))()
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
          <RecipeGridItem
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

export default connect(mapState, mapDispatch)(UserProfileRecipes)
