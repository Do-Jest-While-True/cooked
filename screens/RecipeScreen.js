import React from 'react'
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

import ImageInput from '../components/ImageInput'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const RecipeScreen = ({ route, recipes }) => {
  let [fontsLoaded] = useFonts({
    CoveredByYourGrace_400Regular,
  })

  const recipe = recipes.find((recipe) => recipe.id === route.params.id)

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
          {/* ImageInput TESTING */}
          <ImageInput />
          {/* Recipe Image: */}
          {/* refactor img: */}
          {/* <Image source={{ uri: tempImgUrl }} style={styles.img} /> */}
          <View style={styles.recipeContent}>
            {/* Recipe Name: */}
            <Text style={[styles.recipesHeadings, styles.recipeTitle]}>
              {recipe.name}
            </Text>
            {/* Cook Time */}
            <View style={styles.timeView}>
              <MaterialIcons name="timer" size={18} color={colors.white} />
              <Text style={styles.time}>{recipe.time}</Text>
            </View>
            {/* Ingredients: */}
            <View style={styles.recipesContentSection}>
              <Text style={[styles.recipesHeadings, styles.recipeSubHeading]}>
                Ingredients
              </Text>
              {recipe.ingredients.map((ingredient, i) => (
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
              {recipe.directions.map((direction, i) => (
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
  recipes: state.recipes,
})

export default connect(mapState)(RecipeScreen)

const styles = StyleSheet.create({
  // img: {
  //   height: 400,
  //   width: '100%',
  //   resizeMode: 'cover',
  //   opacity: 0.75,
  // },
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
  },
  singleDirectionView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  singleDirection: {
    fontSize: 15,
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

const tempImgUrl =
  'https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1579721909133-R2KSZ8VGDGBI90DYATBK/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/header4.jpg?format=2500w'
