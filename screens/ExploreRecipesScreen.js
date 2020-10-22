import React, { useEffect } from 'react'
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import { useScrollToTop } from '@react-navigation/native'

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

  // scroll to top onPress of FEED/GLOBAL
  const ref = React.useRef(null)
  useScrollToTop(ref)

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
      {/* I looked into the warning about nesting Virtualized lists inside of a scroll view and it said that it's redundant because they both are doing the same thing. So I took the pull to refresh properties out of scroll view and threw them directly in the FlatList and it works the same, and without the warning! */}
      {/* <ScrollView
        ref={ref}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.white}
          />
        }
      > */}
      {!recipes.length && (
        <Text style={[defaultStyles.text, styles.noRecipesMsg]}>
          No Recipes to Display!
        </Text>
      )}
      {recipes && (
        <FlatList
          ref={ref}
          // Added this from ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.white}
            />
          }
          data={recipes}
          keyExtractor={(recipe) => recipe.id.toString()}
          renderItem={({ item }) => (
            <RecipeListItem
              item={item}
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
      {/* </ScrollView> */}
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
  // eslint-disable-next-line prettier/prettier
  mapDispatchFeed,
)(ExploreRecipesScreen)

export const AllRecipesScreen = connect(
  mapStateAll,
  // eslint-disable-next-line prettier/prettier
  mapDispatchAll,
)(ExploreRecipesScreen)

const styles = StyleSheet.create({
  noRecipesMsg: {
    marginVertical: 50,
    textAlign: 'center',
  },
})
