import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'
import GridList from 'react-native-grid-list'

import { getRecipes } from '../redux/recipes'
import RecipeGridItem from './RecipeGridItem'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

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
          return <RecipeGridItem nav={nav} id={item.id} />
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

const styles = StyleSheet.create({})
