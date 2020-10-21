import React, { useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import {
  CoveredByYourGrace_400Regular,
  useFonts,
} from '@expo-google-fonts/covered-by-your-grace'
import { MaterialIcons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import Likes from '../components/Likes'

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
  const isFocused = useIsFocused()

  useEffect(() => {
    getSingleRecipe(route.params.recipeId)
    // don't need to pass userId on route obj when we call this component from my own user profile
    // I already know who I am in there... causes unwanted 500 without this conditional
    route.params.userId && gotUser(route.params.userId)
  }, [isFocused])

  let [fontsLoaded] = useFonts({
    CoveredByYourGrace_400Regular,
  })

  // the last conditional here says, only care about checking for user.user if coming from the feeds -- if coming from the profile, theres no userId passing through the route obj (and user is not used in the return -- see line 44) so don't worry about checking for user.user
  if (!fontsLoaded || !singleRecipe.id || (route.params.userId && !user.user)) {
    return <AppLoading />
  } else {
    console.log(singleRecipe.createdAt)
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
          {/* Recipe Image: */}
          <Image source={{ uri: singleRecipe.imageUrl }} style={styles.img} />
          <View style={styles.recipeContent}>
            <Likes recipeId={singleRecipe.id} />
            {/* Username: */}
            {/* don't render username when clicking in from my user profile */}
            {route.params.userId && (
              <TouchableOpacity
                onPress={() =>
                  route.params.nav.navigate('Ext User Profile', { user })
                }
              >
                <Text style={[defaultStyles.text, styles.username]}>
                  @{user.user.username}
                </Text>
              </TouchableOpacity>
            )}
            {/* Recipe Name: */}
            <Text style={[styles.recipesHeadings, styles.recipeTitle]}>
              {singleRecipe.name}
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
  authId: state.auth.id,
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
    color: colors.pink,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  recipeContent: {
    margin: 20,
  },
  recipesContentSection: {
    marginBottom: 20,
    borderBottomWidth: 0.25,
    paddingBottom: 25,
    borderBottomColor: colors.white,
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
    paddingBottom: 20,
    marginBottom: 22,
    borderBottomWidth: 0.25,
    borderBottomColor: colors.white,
  },
  time: {
    color: colors.white,
    marginLeft: 5,
  },
})
