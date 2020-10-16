import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { URL } from '../redux/serverUrl'

import colors from '../config/colors'

const RecipeListItem = ({
  recipeId,
  userId,
  name,
  imageUrl,
  time,
  nav,
  user,
  likes,
  authId,
}) => {
  const likedOrNot = likes.filter((like) => like.userId === authId).length

  const [likeCount, setLikeCount] = useState(likes.length)
  const [isLiked, setisLiked] = useState(likedOrNot)

  const liked = async () => {
    if (!isLiked) {
      await axios.put(`${URL}/api/recipes/like/${recipeId}`)
      setLikeCount(likeCount + 1)
      setisLiked(true)
    } else if (isLiked) {
      await axios.delete(`${URL}/api/recipes/like/${recipeId}`)
      setLikeCount(likeCount - 1)
      setisLiked(false)
    }
  }

  if (!user.id) {
    return <AppLoading />
  } else {
    return (
      <TouchableOpacity
        style={styles.listItemView}
        onPress={() => nav.navigate('Recipe', { recipeId })}
      >
        <Image source={{ uri: imageUrl }} style={styles.listItemImg} />
        <View>
          <Text style={styles.listItemName}>{name}</Text>
          <View style={styles.timeView}>
            <MaterialIcons name="timer" size={18} color={colors.white} />
            <Text style={styles.listItemTime}>{time}</Text>
          </View>
          <Text style={styles.userName}>@{user.username}</Text>
          <View style={styles.likeView}>
            <TouchableOpacity onPress={() => liked()}>
              {isLiked ? (
                <MaterialIcons name="favorite" size={18} color={colors.white} />
              ) : (
                <MaterialIcons
                  name="favorite-border"
                  size={18}
                  color={colors.white}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.likeText}>{likeCount} likes</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
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
    borderBottomWidth: 0.3,
    borderColor: colors.white,
    backgroundColor: '#18232e',
  },
  listItemImg: {
    width: 70,
    height: 80,
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
  },
})
