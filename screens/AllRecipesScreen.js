import React, { useEffect } from 'react'
import { StyleSheet, FlatList, SafeAreaView } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { connect } from 'react-redux'

import RecipeListItem from '../components/RecipeListItem'
import SwipeDeleteBtn from '../components/SwipeDeleteBtn'
import { getRecipes } from '../redux/recipes'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const AllRecipesScreen = ({ navigation, getRecipes, recipes }) => {
  useEffect(() => {
    ;(async () => await getRecipes())()
  }, [])

  return (
    <SafeAreaView style={defaultStyles.container}>
      {recipes && (
        <FlatList
          data={recipes}
          keyExtractor={(recipe) => recipe.id.toString()}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={() => <SwipeDeleteBtn id={item.id} />}
              onSwipeableRightOpen={() => console.log('delete opened')}
            >
              <RecipeListItem
                name={item.name}
                imageUrl={item.imageUrl}
                time={item.time}
                id={item.id}
                nav={navigation}
              />
            </Swipeable>
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

const mapState = (state) => ({
  recipes: state.recipes,
})

const mapDispatch = (dispatch) => ({
  getRecipes: () => dispatch(getRecipes()),
})

export default connect(mapState, mapDispatch)(AllRecipesScreen)
