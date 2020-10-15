import React, { useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import {
  CoveredByYourGrace_400Regular,
  useFonts,
} from '@expo-google-fonts/covered-by-your-grace'
import { MaterialIcons } from '@expo/vector-icons'
import { getSingleRecipe, gotUser } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const RecipeScreen = ({
  route,
  singleRecipe,
  getSingleRecipe,
  user,
  gotUser,
}) => {
  useEffect(() => {
    getSingleRecipe(route.params.recipeId)
    gotUser(route.params.userId)
  }, [])

  let [fontsLoaded] = useFonts({
    CoveredByYourGrace_400Regular,
  })

  if (!fontsLoaded || !singleRecipe.id || !user.user) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
          {/* Recipe Image: */}
          <Image source={{ uri: singleRecipe.imageUrl }} style={styles.img} />
          <View style={styles.recipeContent}>
            {/* Recipe Name: */}
            <Text style={[styles.recipesHeadings, styles.recipeTitle]}>
              {singleRecipe.name}
            </Text>
            {/* Username: */}
            <Text style={[defaultStyles.text, styles.username]}>
              @{user.user.username}
            </Text>
            {/* Cook Time */}
            <View style={styles.timeView}>
              <MaterialIcons name="timer" size={18} color={colors.white} />
              <Text style={styles.time}>{singleRecipe.time}</Text>
            </View>
            {/* Ingredients: */}
            <View style={styles.recipesContentSection}>
              <Text style={[styles.recipesHeadings, styles.recipeSubHeading]}>
                Ingredients
              </Text>
              {singleRecipe.ingredients.map((ingredient, i) => (
                <Text key={i} style={styles.singleIngredient}>
                  - {ingredient}
                </Text>
              ))}
            </View>
            {/* Directions: */}
            <View style={styles.recipesContentSection}>
              <Text style={[styles.recipesHeadings, styles.recipeSubHeading]}>
                Directions
              </Text>
              {singleRecipe.directions.map((direction, i) => (
                <View key={i} style={styles.singleDirectionView}>
                  <Text style={styles.singleDirection}>- </Text>
                  <Text style={styles.singleDirection}>{direction}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapState = (state) => ({
  singleRecipe: state.singleRecipe,
  user: state.user.user,
})

const mapDispatch = (dispatch) => ({
  getSingleRecipe: (recipeId) => dispatch(getSingleRecipe(recipeId)),
  gotUser: (userId) => dispatch(gotUser(userId)),
})

export default connect(mapState, mapDispatch)(RecipeScreen)

const styles = StyleSheet.create({
  img: {
    height: 400,
    width: '100%',
    resizeMode: 'cover',
    opacity: 0.75,
  },
  username: {
    color: colors.dark,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  recipeContent: {
    margin: 20,
  },
  recipesContentSection: {
    marginBottom: 20,
  },
  recipeTitle: {
    fontFamily: 'CoveredByYourGrace_400Regular',
    letterSpacing: 3,
    fontSize: 25,
    marginBottom: 18,
  },
  recipesHeadings: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  singleIngredient: {
    marginTop: 10,
    fontSize: 15,
    color: colors.white,
  },
  singleDirectionView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  singleDirection: {
    fontSize: 15,
    color: colors.white,
  },
  timeView: {
    flexDirection: 'row',
    marginBottom: 22,
  },
  time: {
    color: colors.white,
    marginLeft: 5,
  },
})
