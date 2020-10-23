import React, { useEffect, useState } from 'react'
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
import { Feather } from '@expo/vector-icons'
import TimeAgo from 'react-native-timeago'

import Likes from '../components/Likes'
import {
  getSingleRecipe,
  gotUser,
  addComment,
  removeComment,
  editComment,
} from '../redux'
import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const RecipeScreen = ({
  route,
  singleRecipe,
  getSingleRecipe,
  user,
  gotUser,
  authId,
  addComment,
  removeComment,
  editComment,
}) => {
  const isFocused = useIsFocused()

  const [editMode, setEditMode] = useState(false)
  const [number, setNumber] = useState()
  const [commentInfo, setCommentInfo] = useState()

  useEffect(() => {
    getSingleRecipe(route.params.recipeId)
    // don't need to pass userId on route obj when we call this component from my own user profile
    // I already know who I am in there... causes unwanted 500 without this conditional
    route.params.userId && gotUser(route.params.userId)
  }, [isFocused])

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: { comment: '', updatedComment: '' },
    mode: 'onChange',
  })

  function onSubmit() {
    const comment = getValues()
    addComment(route.params.recipeId, comment)
    reset()
  }

  const deleteComment = (comment) => {
    removeComment(comment.id)
  }

  const pressEditComment = (comment) => {
    setEditMode(true)
    setNumber(comment.id)
    setCommentInfo(comment.body)
  }

  const sendUpdatedComment = (comment) => {
    const values = getValues()
    if (values.updatedComment === '') {
      setEditMode(false)
    } else {
      editComment(comment.id, values)
      setEditMode(false)
    }
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
                  <View style={styles.userView}>
                    <Image
                      style={styles.userImg}
                      source={{ uri: user.user.profileImageUrl }}
                    />
                    <Text style={[defaultStyles.text, styles.username]}>
                      {user.user.username}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {/* Likes */}
              <View>
                <Likes style={styles.like} recipeId={singleRecipe.id} />
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
                  <Text style={styles.singleDirectionBold}>{i + 1}. </Text>
                  <Text style={styles.singleDirection}>{direction}</Text>
                </View>
              ))}
            </View>
            {/* Comments: */}
            <View>
              <Text style={styles.commentHeading}>Comments</Text>
              <View>
                <Controller
                  control={control}
                  render={({ onChange, value }) => (
                    <TextInput
                      style={styles.commentFormInput}
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
              {singleRecipe.comments.length ? (
                singleRecipe.comments.map((comment) => {
                  return editMode && number === comment.id ? (
                    <View key={comment.id}>
                      <Controller
                        control={control}
                        render={({ onChange, value }) => (
                          <TextInput
                            style={styles.commentFormInput}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            multiline={true}
                          />
                        )}
                        name="updatedComment"
                        defaultValue={commentInfo}
                      />
                      <View style={styles.commentBtnView}>
                        <TouchableOpacity
                          style={styles.submitBtn}
                          onPress={() => setEditMode(false)}
                        >
                          <Text style={styles.submitBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.submitBtn}
                          onPress={handleSubmit(() =>
                            sendUpdatedComment(comment)
                          )}
                        >
                          <Text style={styles.submitBtnText}>Update</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View key={comment.id} style={styles.commentView}>
                      <View style={styles.commentUserView}>
                        <Image
                          source={{ uri: comment.user.profileImageUrl }}
                          style={styles.commentProfileImg}
                        />
                        <Text
                          style={[defaultStyles.text, styles.commentUsername]}
                        >
                          {comment.user.username}
                        </Text>
                        {comment.userId === authId ? (
                          <View style={styles.deleteCommentView}>
                            {/* EDIT COMMENT */}
                            <View>
                              <TouchableOpacity
                                onPress={() => pressEditComment(comment)}
                                style={styles.commentButton}
                              >
                                <Feather name="edit" size={20} color="yellow" />
                              </TouchableOpacity>
                            </View>
                            {/* DELETE COMMENT */}
                            <View>
                              <TouchableOpacity
                                onPress={() => deleteComment(comment)}
                                style={styles.commentButton}
                              >
                                <Feather
                                  style={styles.deleteCommentText}
                                  name="x-circle"
                                  size={20}
                                  color="black"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : null}
                      </View>
                      <Text style={styles.singleComment}>{comment.body}</Text>
                      {/* TIME AGO */}
                      <View style={styles.timeAgoView}>
                        <Text style={styles.timeAgoText}>
                          <TimeAgo time={comment.createdAt} />
                        </Text>
                      </View>
                    </View>
                  )
                })
              ) : (
                <Text style={styles.singleComment}>There are no comments!</Text>
              )}
              {/* End Comments View */}
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
  editComment: (commentId, comment) =>
    dispatch(editComment(commentId, comment)),
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
  outerUserView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: colors.pink,
    fontWeight: 'bold',
    fontSize: 22,
  },
  userImg: {
    width: 45,
    height: 45,
    borderRadius: 75,
    marginRight: 7,
  },
  //COMMENTS SECTION
  commentHeading: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: 10,
  },
  commentUserView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentProfileImg: {
    width: 20,
    height: 20,
    borderRadius: 75,
    marginRight: 7,
  },
  commentUsername: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentView: {
    flexDirection: 'column',
    marginBottom: 10,
    borderBottomWidth: 0.3,
    borderColor: colors.lightGray,
  },
  singleComment: {
    fontSize: 15,
    color: colors.white,
    marginBottom: 10,
  },
  commentFormInput: {
    backgroundColor: colors.light,
    borderRadius: 10,
    height: 70,
    paddingHorizontal: 20,
    marginVertical: 10,
    paddingTop: 10,
    paddingBottom: 15,
    fontSize: 16,
    color: colors.white,
  },
  submitBtn: {
    backgroundColor: colors.pink,
    borderRadius: 75,
    paddingVertical: 10,
    marginBottom: 30,
    width: '30%',
    height: 40,
    alignSelf: 'center',
  },
  submitBtnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteCommentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  deleteCommentText: {
    color: colors.red,
  },
  commentBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  commentButton: {
    marginHorizontal: 10,
  },
  timeAgoView: {
    alignItems: 'flex-end',
  },
  timeAgoText: {
    color: colors.lightGray,
    fontSize: 11,
    marginBottom: 3,
  },
  //COMMENTS AREA END
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
    letterSpacing: 2,
    fontSize: 24,
    marginBottom: 18,
  },
  recipesHeadings: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  singleIngredient: {
    marginTop: 5,
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
    marginTop: 5,
    fontSize: 15,
    color: colors.white,
  },
  singleDirectionBold: {
    marginTop: 5,
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
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
