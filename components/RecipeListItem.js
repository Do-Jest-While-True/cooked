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
        {/* Image */}
        <Image source={{ uri: imageUrl }} style={styles.listItemImg} />
        <View style={styles.contentView}>
          {/* RECIPE NAME / LIKES FLEX BOX */}
          <View style={styles.recipeNameLikeView}>
            {/* Recipe Name */}
            <Text style={styles.recipeName}>{name}</Text>
            {/* Likes */}
            <View>
              <Likes recipeId={recipeId} />
            </View>
          </View>
          {/* Cook Time */}
          <View style={styles.cookTimeView}>
            <MaterialIcons name="timer" size={18} color={colors.white} />
            <Text style={styles.cookTime}>{time}</Text>
          </View>
          {/* USERNAME / TIME AGO FLEX BOX */}
          <View style={styles.userNameTimeAgoView}>
            {/* Username */}
            <Text style={styles.userName}>@{user.username}</Text>
            {/* Time Ago */}
            <View>
              <Text style={styles.timeAgoText}>
                <TimeAgo time={item.createdAt} />
              </Text>
            </View>
            {/* USERNAME */}
            {/* <View style={styles.user}>
             <Image
               style={styles.userImg}
               source={{ uri: user.profileImageUrl }}
             />
             <Text style={styles.userName}>{user.username}</Text>
           </View>
           <View />
         </View>
         <View style={styles.likesTime}> */}
            {/* LIKES */}
            {/* <View style={styles.like}>
             <Likes recipeId={recipeId} />
           </View> */}
            {/* TIME AGO */}
            {/* <View style={styles.timeAgoView}>
             <Text style={styles.timeAgoText}>
               <TimeAgo time={item.createdAt} />
             </Text> */}
          </View>
        </View>
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
    backgroundColor: colors.mainFaded,
    padding: 15,
  },
  listItemImg: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    borderRadius: 10,
    marginRight: 15,
  },
  contentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  recipeNameLikeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: colors.white,
    width: '85%',
  },
  userNameTimeAgoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.pink,
  },
  cookTime: {
    color: colors.white,
    marginLeft: 5,
  },
  cookTimeView: {
    flexDirection: 'row',
  },
  timeView: {
    flexDirection: 'row',
  },
  likesTime: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  timeAgoText: {
    color: colors.white,
    fontSize: 13,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImg: {
    width: 20,
    height: 20,
    borderRadius: 75,
    marginRight: 7,
  },
})
