import React, { useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import {
  CoveredByYourGrace_400Regular,
  useFonts,
} from '@expo-google-fonts/covered-by-your-grace'
import { MaterialIcons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import Likes from '../components/Likes'

import { getSingleRecipe, gotUser, addComment, removeComment } from '../redux'
import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'
import { color } from 'react-native-reanimated'

const RecipeScreen = ({
  route,
  singleRecipe,
  getSingleRecipe,
  user,
  gotUser,
  addComment,
  removeComment,
}) => {
  const isFocused = useIsFocused()

  useEffect(() => {
    getSingleRecipe(route.params.recipeId)
    // don't need to pass userId on route obj when we call this component from my own user profile
    // I already know who I am in there... causes unwanted 500 without this conditional
    route.params.userId && gotUser(route.params.userId)
  }, [isFocused])

  const { control, handleSubmit, getValues } = useForm()

  function onSubmit() {
    const value = getValues()
    addComment(route.params.recipeId, value)
  }

  let [fontsLoaded] = useFonts({
    CoveredByYourGrace_400Regular,
  })

  // the last conditional here says, only care about checking for user.user if coming from the feeds -- if coming from the profile, theres no userId passing through the route obj (and user is not used in the return -- see line 44) so don't worry about checking for user.user
  if (!fontsLoaded || !singleRecipe.id || (route.params.userId && !user.user)) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaView style={defaultStyles.container}>
        <ScrollView>
          {/* Recipe Image: */}
          <Image source={{ uri: singleRecipe.imageUrl }} style={styles.img} />
          <View style={styles.recipeContent}>
            {/* USERNAME & LIKE FLEX */}
            <View style={styles.usernameLikeRow}>
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
              {/* Likes */}
              <View>
                <Likes recipeId={singleRecipe.id} />
              </View>
            </View>
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
            <View style={[styles.recipesContentSection, styles.directionView]}>
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
            {/* Comments: */}
            <View style={styles.commentsView}>
              <Text style={[styles.commentHeading]}>Comments</Text>
              {singleRecipe.comments.length ? (
                singleRecipe.comments.map((comment) => (
                  <View key={comment.id} style={styles.commentView}>
                    <View style={styles.commentUserView}>
                      <Image
                        source={{ uri: comment.user.profileImageUrl }}
                        style={styles.profileImgComment}
                      />
                      <Text
                        style={[defaultStyles.text, styles.commentUsername]}
                      >
                        {comment.user.username}
                      </Text>
                    </View>
                    <Text style={styles.singleComment}>{comment.body}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.singleComment}>There are no comments!</Text>
              )}
              {/* Comment input Form, addComment is already imported and passed to the function.  We just need to add a form that sends the info into the addComment thunk and test to see if the reducer is good money.  Deleting a comment will be more difficult to solve, but that was imported into the function as well.*/}
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <TextInput
                    style={styles.formInput}
                    placeholder="Type Comment Here!"
                    placeholderTextColor={colors.lightGray}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    multiline={true}
                  />
                )}
                name="comment"
              />
              <View style={styles.submitBtnView}>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.submitBtnText}>Submit</Text>
                </TouchableOpacity>
              </View>
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
  addComment: (recipeId, comment) => dispatch(addComment(recipeId, comment)),
  removeComment: (commentId) => dispatch(removeComment(commentId)),
})

export default connect(mapState, mapDispatch)(RecipeScreen)

const styles = StyleSheet.create({
  img: {
    height: 400,
    width: '100%',
    resizeMode: 'cover',
    opacity: 0.75,
  },
  usernameLikeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
    marginTop: 12,
    fontSize: 15,
    color: colors.white,
  },
  directionView: {
    borderBottomWidth: 2,
  },
  singleDirectionView: {
    flexDirection: 'row',
  },
  singleDirection: {
    marginTop: 12,
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
  // COMMENTS SECTION
  commentsView: {},
  commentHeading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: 10,
  },
  commentUsername: {
    color: colors.lightBlue,
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 7,
  },
  commentUserView: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  commentView: {
    flexDirection: 'column',
    marginBottom: 10,
    borderBottomWidth: 0.3,
    borderColor: colors.lightGray,
    paddingVertical: 8,
  },
  profileImgComment: {
    width: 14,
    height: 14,
    borderRadius: 75,
    marginRight: 7,
  },
  singleComment: {
    fontSize: 15,
    color: colors.white,
    marginBottom: 10,
  },
  formInput: {
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 80,
    paddingHorizontal: 20,
    marginVertical: 20,
    fontSize: 16,
    color: colors.white,
  },
  submitBtn: {
    backgroundColor: colors.pink,
    borderRadius: 75,
    paddingVertical: 10,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 200,
  },
  submitBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
