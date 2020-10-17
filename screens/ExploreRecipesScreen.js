import React, { useEffect } from 'react'
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

import RecipeListItem from '../components/RecipeListItem'
import { getFeedRecipes, getAllRecipes } from '../redux'

import defaultStyles from '../config/defaultStyles'
import colors from '../config/colors'

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
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.white}
          />
        }
      >
        {!recipes.length && (
          <Text style={[defaultStyles.text, styles.noRecipesMsg]}>
            No Recipes to Display!
          </Text>
        )}
        {recipes && (
          <FlatList
            data={recipes}
            keyExtractor={(recipe) => recipe.id.toString()}
            renderItem={({ item }) => (
              <RecipeListItem
                name={item.name}
                imageUrl={item.imageUrl}
                time={item.time}
                recipeId={item.id}
                user={item.user}
                nav={navigation}
                userId={item.userId}
                likes={item.likes}
              />
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

const styles = StyleSheet.create({
  noRecipesMsg: {
    marginVertical: 50,
    textAlign: 'center',
  },
})
