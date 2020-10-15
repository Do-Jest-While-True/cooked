import React, { useEffect } from 'react'
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { connect } from 'react-redux'

import RecipeListItem from '../components/RecipeListItem'
import SwipeDeleteBtn from '../components/SwipeDeleteBtn'
import { getFeedRecipes, getAllRecipes } from '../redux'

import defaultStyles from '../config/defaultStyles'

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

const ExploreRecipesScreen = ({ navigation, getRecipes, recipes }) => {
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(1000).then(() => setRefreshing(false))
    getRecipes()
  }, [])

  useEffect(() => {
    getRecipes()
  }, [])
  return (
    <SafeAreaView style={defaultStyles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                  recipeId={item.id}
                  user={item.user}
                  nav={navigation}
                />
              </Swipeable>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateFeed = (state) => ({
  recipes: state.feedRecipes,
})

const mapStateAll = (state) => ({
  recipes: state.allRecipes,
})

const mapDispatchFeed = (dispatch) => ({
  getRecipes: () => dispatch(getFeedRecipes()),
})

const mapDispatchAll = (dispatch) => ({
  getRecipes: () => dispatch(getAllRecipes()),
})

export const FeedRecipesScreen = connect(
  mapStateFeed,
  mapDispatchFeed
)(ExploreRecipesScreen)

export const AllRecipesScreen = connect(
  mapStateAll,
  mapDispatchAll
)(ExploreRecipesScreen)
