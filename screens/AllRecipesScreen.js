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
import { getRecipes } from '../redux'

import defaultStyles from '../config/defaultStyles'

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

const AllRecipesScreen = ({ navigation, getRecipes, recipes }) => {
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
                  id={item.id}
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

const mapState = (state) => ({
  recipes: state.recipes,
})

const mapDispatch = (dispatch) => ({
  getRecipes: () => dispatch(getRecipes()),
})

export default connect(mapState, mapDispatch)(AllRecipesScreen)
