import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { AppLoading } from 'expo'
import TimeAgo from 'react-native-timeago'
import Likes from './Likes'

import colors from '../config/colors'
import { screenWidth } from '../config/dimensions'

const RecipeListItem = ({
  item,
  recipeId,
  name,
  imageUrl,
  time,
  nav,
  user,
  userId,
  authId,
}) => {
  if (!user.id) {
    return <AppLoading />
  } else {
    return (
      <TouchableOpacity
        style={styles.listItemView}
        onPress={() =>
          nav.navigate('Recipe', {
            recipeId,
            userId,
            nav,
            authId,
          })
        }
      >
        {/* IMAGE */}
        <Image source={{ uri: imageUrl }} style={styles.listItemImg} />
        <View style={styles.contentView}>
          <Text style={styles.listItemName}>{name}</Text>
          {/* TIME */}
          <View style={styles.timeView}>
            <MaterialIcons name="timer" size={18} color={colors.white} />
            <Text style={styles.listItemTime}>{time}</Text>
          </View>
          {/* USERNAME */}
          <Text style={styles.userName}>@{user.username}</Text>
          {/* TIME AGO */}
          <View>
            <Text style={styles.timeAgoText}>
              <TimeAgo time={item.createdAt} />
            </Text>
          </View>
          <View />
        </View>
        {/* LIKES */}
        <Likes recipeId={recipeId} />
      </TouchableOpacity>
    )
  }
}

const mapState = (state) => ({
  authId: state.auth.id,
  singleRecipe: state.singleRecipe,
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
  contentView: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  likeView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  listItemName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.white,
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.pink,
  },
  listItemTime: {
    color: '#fff',
    marginLeft: 5,
  },
  timeView: {
    flexDirection: 'row',
  },
  likeText: {
    color: colors.white,
    fontSize: 20,
    marginLeft: 8,
  },
  timeAgoView: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  timeAgoText: {
    color: colors.white,
    fontSize: 11,
  },
})
