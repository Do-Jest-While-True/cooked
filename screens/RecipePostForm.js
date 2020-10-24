import React, { useState } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import {
  CoveredByYourGrace_400Regular,
  useFonts,
} from '@expo-google-fonts/covered-by-your-grace'
import { AntDesign } from '@expo/vector-icons'

import ImageInput from '../components/ImageInput'
import { postRecipe, removeImageUrl } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const RecipePostForm = ({ recipe, postRecipe, removeImageUrl, navigation }) => {
  const [recipeName, setRecipeName] = useState('')
  const [time, setTime] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [direction, setDirection] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])
  // for validations:
  const [nameFieldWarning, setNameFieldWarning] = useState(false)
  const [timeFieldWarning, setTimeFieldWarning] = useState(false)
  const [ingredientsFieldWarning, setIngredientsFieldWarning] = useState(false)
  const [directionsFieldWarning, setDirectionsFieldWarning] = useState(false)
  const [imageFieldWarning, setImageFieldWarning] = useState(false)

  // scroll to top onPress of tab bar icon
  const ref = React.useRef(null)
  useScrollToTop(ref)

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

  const handleReset = () => {
    Alert.alert(
      'Reset Form',
      "All of your changes will be discarded, are you sure you'd like to proceed?",
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // reset fields / state
            setRecipeName('')
            setTime('')
            setIngredient('')
            setIngredients([])
            setDirection('')
            setDirections([])
            removeImageUrl()
            // reset warning messages
            setNameFieldWarning(false)
            setTimeFieldWarning(false)
            setIngredientsFieldWarning(false)
            setDirectionsFieldWarning(false)
            setImageFieldWarning(false)
          },
        },
      ]
    )
  }

  const handlePost = async () => {
    // for validations:
    if (!recipe.imageUrl) {
      return setImageFieldWarning(true)
    }
    if (!recipeName) {
      return setNameFieldWarning(true)
    }
    if (!time) {
      return setTimeFieldWarning(true)
    }
    if (!ingredients.length) {
      return setIngredientsFieldWarning(true)
    }
    if (!directions.length) {
      return setDirectionsFieldWarning(true)
    }
    await postRecipe({
      imageUrl: recipe.imageUrl,
      name: recipeName,
      time: time,
      ingredients: ingredients,
      directions: directions,
    })

    // reset fields / state
    setRecipeName('')
    setTime('')
    setIngredient('')
    setIngredients([])
    setDirection('')
    setDirections([])
    removeImageUrl()

    // reset warning messages
    setNameFieldWarning(false)
    setTimeFieldWarning(false)
    setIngredientsFieldWarning(false)
    setDirectionsFieldWarning(false)
    setImageFieldWarning(false)

    // navigate to All Recipes View after posting:
    navigation.navigate('Explore')
  }

  let [fontsLoaded] = useFonts({
    CoveredByYourGrace_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <KeyboardAvoidingView
        style={[defaultStyles.container, styles.container]}
        behavior="padding"
        keyboardVerticalOffset={110}
      >
        <SafeAreaView>
          <ScrollView ref={ref}>
            {/* ImageInput __________________________________________*/}
            {imageFieldWarning && (
              <Text style={[defaultStyles.text, styles.warning]}>
                Please Add an Image!
              </Text>
            )}
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
                placeholderTextColor={colors.lightGray}
                style={[styles.formInput, styles.formInputFullWidth]}
                clearButtonMode="always"
                onChangeText={(val) => {
                  setRecipeName(val)
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
                placeholderTextColor={colors.lightGray}
                style={[styles.formInput, styles.formInputFullWidth]}
                clearButtonMode="always"
                onChangeText={(val) => {
                  setTime(val)
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
                    placeholderTextColor={colors.lightGray}
                    style={[styles.formInput]}
                    clearButtonMode="always"
                    onChangeText={(val) => {
                      setIngredient(val)
                    }}
                    // return btn on keyboard acts same as clicking +
                    onSubmitEditing={addIngredient}
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
                {/* refactor to UUID for key!!!! */}
                {/* need a DELETE single button */}
                {ingredients.map((item, i) => (
                  <Text key={i} style={styles.singleIngredientDirection}>
                    - {item}
                  </Text>
                ))}
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
                    placeholderTextColor={colors.lightGray}
                    style={[styles.formInput]}
                    clearButtonMode="always"
                    onChangeText={(val) => {
                      setDirection(val)
                    }}
                    // return btn on keyboard acts same as clicking +
                    onSubmitEditing={addDirection}
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
                {/* refactor to UUID for key!!!! */}
                {/* need a DELETE single button */}
                {directions.map((item, i) => (
                  <Text key={i} style={styles.singleIngredientDirection}>
                    - {item}
                  </Text>
                ))}
              </View>
              {/* Post Button ____________________________________*/}
              <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                <Text style={styles.postBtnText}>cook'd!</Text>
              </TouchableOpacity>
              {/* Reset Form Button */}
              <View style={styles.resetBtnView}>
                <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                  <Text style={styles.resetBtnText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
    color: colors.white,
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
  singleIngredientDirection: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    color: colors.white,
  },
  singleDirectionView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  postBtn: {
    backgroundColor: colors.pink,
    borderRadius: 25,
    marginTop: 20,
    padding: 12,
  },
  postBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  resetBtnView: {
    borderTopWidth: 2,
    borderTopColor: colors.lightBorder,
    marginTop: 40,
    paddingTop: 40,
  },
  resetBtn: {
    backgroundColor: colors.lightBlue,
    borderRadius: 25,
    padding: 12,
  },
  resetBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  warning: {
    color: colors.pink,
    alignSelf: 'center',
  },
})
