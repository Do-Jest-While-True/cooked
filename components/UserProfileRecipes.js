import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import GridList from 'react-native-grid-list'

import { getRecipes } from '../redux/recipes'
import RecipeGridItem from './RecipeGridItem'

// refactor to class ???
const UserProfileRecipes = ({ recipes, getRecipes, nav }) => {
  useEffect(() => {
    ;(async () => await getRecipes())()
  }, [])

  return (
    recipes && (
      <GridList
        showSeparator
        data={recipes}
        numColumns={3}
        renderItem={({ item }) => {
          // refactor img:
          return <RecipeGridItem nav={nav} id={item.id} imageUrl={tempImgUrl} />
        }}
      />
    )
  )
}

const mapState = (state) => ({
  recipes: state.recipes,
})

const mapDispatch = (dispatch) => ({
  getRecipes: () => dispatch(getRecipes()),
})

export default connect(mapState, mapDispatch)(UserProfileRecipes)

const tempImgUrl =
  'https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1579721909133-R2KSZ8VGDGBI90DYATBK/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/header4.jpg?format=2500w'
