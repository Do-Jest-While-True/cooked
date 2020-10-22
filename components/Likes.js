import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import axios from 'axios'
import { MaterialIcons } from '@expo/vector-icons'
import {
  URL,
  getLikeObject,
  addLikeObject,
  removeLikeObject,
  getSingleRecipe,
} from '../redux'

import colors from '../config/colors'
import { connect } from 'react-redux'

const Likes = ({
  getLikeObject,
  addLikeObject,
  removeLikeObject,
  singleRecipe,
  userLikes,
  authId,
  recipeId,
  likesList,
}) => {
  useEffect(() => {
    // getsingleRecipe()
    getLikeObject()
  }, [])
  // let singleRecipe = allRecipes.filter(recipe => recipe.id === recipeId)
  // let likes = singleRecipe[0].likes

  // console.log(likes)
  // // let recipeId = singleRecipe.id
  // const likedOrNot = likes.filter((like) => like.userId === authId).length
  // const [likeCount, setLikeCount] = useState(likes.length)
  let isLiked = userLikes
    ? userLikes.filter(
        (userLikeObject) => userLikeObject.recipeId === recipeId
      )[0]
    : []

  const liked = async () => {
    if (!isLiked) {
      isLiked = true
      addLikeObject(recipeId)
    } else if (isLiked) {
      isLiked = false
      removeLikeObject(recipeId)
    }
  }

  if (userLikes) {
    return (
      <View style={styles.likeView}>
        <TouchableOpacity onPress={() => liked()}>
          {isLiked ? (
            <MaterialIcons name="favorite" size={24} color={colors.pink} />
          ) : (
            <MaterialIcons
              name="favorite-border"
              size={24}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

const mapState = (state) => ({
  userLikes: state.userLikes,
  // singleRecipe: state.singleRecipe
})

const mapDispatch = (dispatch) => ({
  getLikeObject: () => dispatch(getLikeObject()),
  addLikeObject: (recipeId) => dispatch(addLikeObject(recipeId)),
  removeLikeObject: (recipeId) => dispatch(removeLikeObject(recipeId)),
  getSingleRecipe: (recipeId) => dispatch(getSingleRecipe(recipeId)),
})

export default connect(mapState, mapDispatch)(Likes)

const styles = StyleSheet.create({
  likeView: {
    flex: 1,
    flexDirection: 'row',
  },
  likeText: {
    color: colors.white,
    marginRight: 8,
    fontSize: 18,
  },
})
