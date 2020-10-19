import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import axios from 'axios'
import { MaterialIcons } from '@expo/vector-icons'
import { URL, getSingleRecipe } from '../redux'

import colors from '../config/colors'
import { connect } from 'react-redux'

const Likes = ({ singleRecipe, authId, recipeId, likesList }) => {
  useEffect(() => {
    getSingleRecipe()
  }, [])
  let likes = singleRecipe.likes || []
  // let recipeId = singleRecipe.id
  const likedOrNot = likes.filter((like) => like.userId === authId).length
  const [likeCount, setLikeCount] = useState(likes.length)
  const [isLiked, setIsLiked] = useState(likedOrNot)

  const liked = async () => {
    if (!isLiked) {
      await axios.put(`${URL}/api/recipes/like/${recipeId}`)
      setLikeCount(likeCount + 1)
      setIsLiked(true)
    } else if (isLiked) {
      await axios.delete(`${URL}/api/recipes/like/${recipeId}`)
      setLikeCount(likeCount - 1)
      setIsLiked(false)
    }
  }

  if (singleRecipe) {
    return (
      <View style={styles.likeView}>
        <TouchableOpacity onPress={() => liked()}>
          {isLiked ? (
            <MaterialIcons name="favorite" size={24} color={colors.white} />
          ) : (
            <MaterialIcons
              name="favorite-border"
              size={24}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.likeText}>{likeCount}</Text>
      </View>
    )
  }
}

const mapState = (state) => ({
  singleRecipe: state.singleRecipe,
})

const mapDispatch = (dispatch) => ({
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
    marginLeft: 8,
    fontSize: 18,
  },
})
