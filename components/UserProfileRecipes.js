import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid'

import { getAllRecipes } from '../redux'
import RecipeGridItem from './RecipeGridItem'
import { oneThirdScreenWidth } from '../config/dimensions'

const UserProfileRecipes = ({ recipes, getAllRecipes, nav }) => {
  useEffect(() => {
    ;(async () => await getAllRecipes())()
  }, [])

  return (
    recipes && (
      <FlatGrid
        // this # is determining how many grid elements can fit in one row:
        // actual width and height can overflow, those are determined their component style
        itemDimension={oneThirdScreenWidth}
        spacing={0}
        data={recipes}
        renderItem={({ item }) => {
          return (
            <RecipeGridItem nav={nav} id={item.id} imageUrl={item.imageUrl} />
          )
        }}
      />
    )
  )
}

const mapState = (state) => ({
  recipes: state.allRecipes,
})

const mapDispatch = (dispatch) => ({
  getAllRecipes: () => dispatch(getAllRecipes()),
})

export default connect(mapState, mapDispatch)(UserProfileRecipes)
