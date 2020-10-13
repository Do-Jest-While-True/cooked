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
import { postRecipe, removeImageUrl } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'
import recipes from '../redux/recipes'

// REMOVE WARNINGS AFTER POSTING SUCCESSFULLY
const RecipePostForm = ({ recipe, postRecipe, removeImageUrl, navigation }) => {
  const [recipeName, setRecipeName] = useState('')
  const [time, setTime] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [direction, setDirection] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])
  // for validations:
  const [nameFieldEmpty, setNameFieldEmpty] = useState(true)
  const [nameFieldWarning, setNameFieldWarning] = useState(false)
  const [timeFieldEmpty, setTimeFieldEmpty] = useState(true)
  const [timeFieldWarning, setTimeFieldWarning] = useState(false)
  const [ingredientsFieldEmpty, setIngredientsFieldEmpty] = useState(true)
  const [ingredientsFieldWarning, setIngredientsFieldWarning] = useState(false)
  const [directionsFieldEmpty, setDirectionsFieldEmpty] = useState(true)
  const [directionsFieldWarning, setDirectionsFieldWarning] = useState(false)
  // const [imageFieldEmpty, setImageFieldEmpty] = useState(true)
  // const [imageFieldWarning, setImageFieldWarning] = useState(false)

  // add a single ingredient to new recipe object ingredients array
  const addIngredient = () => {
    setIngredients([...ingredients, ingredient])
    setIngredient('')
  }

  // add a single direction to new recipe object directions array
  const addDirection = () => {
    setDirections([...directions, direction])
    setDirection('')
  }

  const handlePost = async () => {
    // for validations:
    if (nameFieldEmpty) {
      return setNameFieldWarning(true)
    }
    if (timeFieldEmpty) {
      return setTimeFieldWarning(true)
    }
    if (ingredientsFieldEmpty) {
      return setIngredientsFieldWarning(true)
    }
    if (directionsFieldEmpty) {
      return setDirectionsFieldWarning(true)
    }
    // if (imageFieldEmpty) {
    //   return setImageFieldWarning(true)
    // }

    await postRecipe({
      imageUrl: recipe.imageUrl,
      name: recipeName,
      time: time,
      ingredients: ingredients,
      directions: directions,
    })

    // reset fields / local state:
    setRecipeName('')
    setTime('')
    setIngredients([])
    setDirections([])
    // clear imageUrl from store state:
    removeImageUrl()

    // navigate to All Recipes View after posting:
    // (need to add pull to refresh and also sort All Recipes to be reverse-cron)
    navigation.navigate('Explore')
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
          {/* ImageInput __________________________________________*/}
          <ImageInput />
          <View style={styles.recipeContent}>
            {/* Recipe Name: ________________________________________*/}
            {nameFieldWarning && (
              <Text style={[defaultStyles.text, styles.warning]}>
                Please Enter a Recipe Title!
              </Text>
            )}
            <TextInput
              placeholder="Enter Recipe Title"
              style={[styles.formInput, styles.formInputFullWidth]}
              clearButtonMode="always"
              onChangeText={(val) => {
                setRecipeName(val)
                setNameFieldEmpty(false)
              }}
              value={recipeName}
            />
            {/* Cook Time ___________________________________________*/}
            {timeFieldWarning && (
              <Text style={[defaultStyles.text, styles.warning]}>
                Please Enter a Cook Time!
              </Text>
            )}
            <TextInput
              placeholder="Enter Cook Time: ex: '5 minutes'"
              style={[styles.formInput, styles.formInputFullWidth]}
              clearButtonMode="always"
              onChangeText={(val) => {
                setTime(val)
                setTimeFieldEmpty(false)
              }}
              value={time}
            />
            {/* Ingredients: ________________________________________*/}
            {ingredientsFieldWarning && (
              <Text style={[defaultStyles.text, styles.warning]}>
                No Ingredients!
              </Text>
            )}
            <View>
              <View style={styles.formInputView}>
                <TextInput
                  placeholder="Add Ingredient"
                  style={[styles.formInput]}
                  clearButtonMode="always"
                  onChangeText={(val) => {
                    setIngredient(val)
                    setIngredientsFieldEmpty(false)
                  }}
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
              {/* render list of ingredients inputted */}
              {/* {recipe.ingredients.map((item) => {
							console.log('map hit -------------------');
							return <Text key={i}>{item}</Text>;
						})} */}
            </View>
            {/* Directions: ________________________________________*/}
            {directionsFieldWarning && (
              <Text style={[defaultStyles.text, styles.warning]}>
                No Directions!
              </Text>
            )}
            <View>
              <View style={styles.formInputView}>
                <TextInput
                  placeholder="Add Direction"
                  style={[styles.formInput]}
                  clearButtonMode="always"
                  onChangeText={(val) => {
                    setDirection(val)
                    setDirectionsFieldEmpty(false)
                  }}
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
              {/* render list of directions inputted */}
            </View>
            {/* Post Button ____________________________________*/}
            <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
              <Text style={styles.postBtnText}>Post!</Text>
            </TouchableOpacity>
          </View>
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
  removeImageUrl: () => dispatch(removeImageUrl()),
})

export default connect(mapState, mapDispatch)(RecipePostForm)

const styles = StyleSheet.create({
  recipeContent: {
    margin: 20,
    minHeight: 750, // this is for UX -- adds room to scroll when inputing directions
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
    marginVertical: 20,
    padding: 12,
  },
  postBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  warning: {
    color: colors.red,
    alignSelf: 'center',
  },
})
