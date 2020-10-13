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
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

import ImageInput from '../components/ImageInput'
import { postRecipe } from '../redux/recipe'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const RecipePostForm = ({ recipe, postRecipe, navigation }) => {
  const [recipeName, setRecipeName] = useState('')
  const [time, setTime] = useState(0)
  const [ingredient, setIngredient] = useState('')
  const [direction, setDirection] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])

  const addIngredient = () => {
    setIngredients([...ingredients, ingredient])
    setIngredient('')
  }

  const addDirection = () => {
    setDirections([...directions, direction])
    setDirection('')
  }

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
    // navigation.navigate('Recipe', { id: recipe.id })
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
              placeholder="Enter Recipe Title"
              style={[styles.formInput, styles.formInputFullWidth]}
              clearButtonMode="always"
              onChangeText={(val) => setRecipeName(val)}
              value={recipeName}
            />
            {/* Cook Time */}
            <TextInput
              placeholder="Enter Cook Time: ex: '5 minutes'"
              style={[styles.formInput, styles.formInputFullWidth]}
              clearButtonMode="always"
              onChangeText={(val) => setTime(val)}
              value={time}
            />
            {/* Ingredients: */}
            <View>
              <View style={styles.formInputView}>
                <TextInput
                  placeholder="Add Ingredient"
                  style={[styles.formInput]}
                  clearButtonMode="always"
                  onChangeText={(val) => setIngredient(val)}
                  value={ingredient}
                />
                <TouchableOpacity>
                  <AntDesign
                    name="pluscircleo"
                    size={30}
                    color={colors.white}
                    onPress={addIngredient}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Directions: */}
            <View>
              <View style={styles.formInputView}>
                <TextInput
                  placeholder="Add Direction"
                  style={[styles.formInput]}
                  clearButtonMode="always"
                  onChangeText={(val) => setDirection(val)}
                  value={direction}
                />
                <TouchableOpacity>
                  <AntDesign
                    name="pluscircleo"
                    size={30}
                    color={colors.white}
                    onPress={addDirection}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>Post!</Text>
          </TouchableOpacity>
          {console.log('---------------------------------')}
          {console.log('Local State in Form')}
          {console.log('---------------------------------')}
          {console.log({
            imageUrl: recipe.imageUrl,
            name: recipeName,
            time: time,
            ingredient: ingredient,
            ingredients: ingredients,
            direction: direction,
            directions: directions,
          })}
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
  formInputView: {
    flexDirection: 'row',
    alignItems: 'center',
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
  renderedInputText: {
    fontSize: 20,
    color: colors.white,
    marginBottom: 8,
    marginLeft: 20,
  },
  singleIngredientView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
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
