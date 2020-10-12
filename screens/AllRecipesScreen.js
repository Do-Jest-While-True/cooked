import React, { useEffect } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { connect } from 'react-redux'

import RecipeListItem from '../components/RecipeListItem'
import SwipeDeleteBtn from '../components/SwipeDeleteBtn'
import { getRecipes } from '../redux/recipes'

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
                // refactor img:
                imageUrl={tempImgUrl}
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

const mapState = (state) => ({
  recipes: state.recipes,
})

const mapDispatch = (dispatch) => ({
  getRecipes: () => dispatch(getRecipes()),
})

export default connect(mapState, mapDispatch)(AllRecipesScreen)

const tempImgUrl =
  'https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1579721909133-R2KSZ8VGDGBI90DYATBK/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/header4.jpg?format=2500w'
