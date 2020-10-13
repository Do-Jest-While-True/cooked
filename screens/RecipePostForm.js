import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import {
  CoveredByYourGrace_400Regular,
  useFonts,
} from '@expo-google-fonts/covered-by-your-grace'

import ImageInput from '../components/ImageInput'
import SubFormIngredients from '../components/SubFormIngredients'
import SubFormDirections from '../components/SubFormDirections'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'
import { postRecipe } from '../redux/recipe'

const RecipePostForm = ({ recipe, postRecipe, navigation }) => {
  const [recipeName, setRecipeName] = useState('')
  const [time, setTime] = useState(0)
  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])

  const handlePost = async () => {
    await postRecipe({
      imageUrl: recipe.imageUrl,
      name: recipeName,
      time: time,
      ingredients: ingredients,
      directions: directions,
    })
    // reset fields / local state
    setRecipeName('')
    setTime('')
    setIngredients([])
    setDirections([])
    // navigate to single recipe
    navigation.navigate('Recipe', { id: recipe.id })
  }

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
            <TextInput
              placeholder="Enter Recipe Name"
              style={[styles.formInput, styles.formInputFullWidth]}
              clearButtonMode="always"
              onChangeText={(val) => setRecipeName(val)}
              value={recipeName}
            />
            {/* Cook Time */}
            <TextInput
              placeholder="Enter Cook Time: '5 minutes'"
              style={[styles.formInput, styles.formInputFullWidth]}
              clearButtonMode="always"
              onChangeText={(val) => setTime(val)}
              value={time}
            />
            {/* Ingredients: */}
            <View style={{}}>
              <SubFormIngredients
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            </View>
            {/* Directions: */}
            <View style={{}}>
              <SubFormDirections
                directions={directions}
                setDirections={setDirections}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>Post!</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapState = (state) => ({
  recipe: state.recipe,
})

const mapDispatch = (dispatch) => ({
  postRecipe: (recipeData) => dispatch(postRecipe(recipeData)),
})

export default connect(mapState, mapDispatch)(RecipePostForm)

const styles = StyleSheet.create({
  recipeContent: {
    margin: 20,
  },
  singleIngredient: {
    marginTop: 10,
    fontSize: 15,
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 25,
    height: 50,
    width: '88%',
    paddingHorizontal: 20,
    marginVertical: 20,
    marginRight: 15,
    fontSize: 20,
  },
  formInputFullWidth: {
    width: '100%',
  },
  singleDirectionView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  singleDirection: {
    fontSize: 15,
  },
  postBtn: {
    backgroundColor: colors.dark,
    borderRadius: 25,
    margin: 20,
    padding: 12,
  },
  postBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
})
