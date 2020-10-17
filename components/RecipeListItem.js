import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { AppLoading } from 'expo'
import { URL } from '../redux/serverUrl'

import colors from '../config/colors'
import { screenWidth } from '../config/dimensions'

const RecipeListItem = ({
  recipeId,
  name,
  imageUrl,
  time,
  nav,
  user,
  likes,
  userId,
  authId,
}) => {
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

  if (!user.id) {
    return <AppLoading />
  } else {
    return (
      <TouchableOpacity
        style={styles.listItemView}
        onPress={() => nav.navigate('Recipe', { recipeId, userId, nav })}
      >
        {/* IMAGE */}
        <Image source={{ uri: imageUrl }} style={styles.listItemImg} />
        <View>
          <Text style={styles.listItemName}>{name}</Text>
          {/* TIME */}
          <View style={styles.timeView}>
            <MaterialIcons name="timer" size={18} color={colors.white} />
            <Text style={styles.listItemTime}>{time}</Text>
          </View>
          {/* USERNAME */}
          <Text style={styles.userName}>@{user.username}</Text>
          <View>
            {/* LIKES */}
            <View style={styles.likeView}>
              <TouchableOpacity onPress={() => liked()}>
                {isLiked ? (
                  <MaterialIcons
                    name="favorite"
                    size={18}
                    color={colors.white}
                  />
                ) : (
                  <MaterialIcons
                    name="favorite-border"
                    size={18}
                    color={colors.white}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.likeText}>{likeCount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapState = (state) => ({
  authId: state.auth.id,
})

export default connect(mapState)(RecipeListItem)

const styles = StyleSheet.create({
  listItemView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.25,
    borderBottomWidth: 0.3,
    borderColor: colors.lightGray,
    backgroundColor: '#18232e',
    paddingVertical: 5,
  },
  listItemImg: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    borderRadius: 10,
    margin: 15,
  },
  listItemName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.darkGray,
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.dark,
  },
  listItemTime: {
    color: '#fff',
    marginLeft: 5,
  },
  timeView: {
    flexDirection: 'row',
  },
  likeView: {
    flex: 1,
    flexDirection: 'row',
  },
  likeText: {
    color: colors.white,
    marginLeft: 8,
  },
})
