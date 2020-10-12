import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import {
  CoveredByYourGrace_400Regular,
  useFonts,
} from '@expo-google-fonts/covered-by-your-grace'
import { MaterialIcons } from '@expo/vector-icons'

import ImageInput from '../components/ImageInput'
import SubFormRecipeName from '../components/SubFormRecipeName'
import SubFormIngredients from '../components/SubFormIngredients'
import SubFormDirections from '../components/SubFormDirections'
import SubFormTime from '../components/SubFormTime'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const RecipePostForm = () => {
  const [recipeName, setRecipeName] = useState('')
  const [time, setTime] = useState(0)
  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])

  let [fontsLoaded] = useFonts({
    CoveredByYourGrace_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
          {/* ImageInput */}
          <ImageInput />
          <View style={styles.recipeContent}>
            {/* Recipe Name: */}
            <SubFormRecipeName
              recipeName={recipeName}
              setRecipeName={setRecipeName}
            />
            {/* Cook Time */}
            <SubFormTime time={time} setTime={setTime} />
            {/* Ingredients: */}
            <View style={styles.recipesContentSection}>
              <SubFormIngredients
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            </View>
            {/* Directions: */}
            <View style={styles.recipesContentSection}>
              <SubFormDirections
                directions={directions}
                setDirections={setDirections}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapState = (state) => ({})

export default connect(mapState)(RecipePostForm)

const styles = StyleSheet.create({
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
