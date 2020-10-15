import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import { MaterialIcons } from '@expo/vector-icons'
// import { TouchableOpacity } from 'react-native-gesture-handler'

import colors from '../config/colors'
import { gotUser } from '../redux'

const RecipeListItem = ({
  recipeId,
  name,
  imageUrl,
  time,
  nav,
  user,
  gotUser,
  userProp,
}) => {
  useEffect(() => {
    gotUser(user.id)
  }, [])

  console.log('user on the recipelistItem===', user)
  if (!userProp) {
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
          <TouchableOpacity onPress={() => nav.navigate()}>
            <Text style={styles.userName}>@{user.username}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapState = (state) => ({
  userProp: state.user.user,
})

const mapDispatch = (dispatch) => ({
  gotUser: (userId) => dispatch(gotUser(userId)),
})

export default connect(mapState, mapDispatch)(RecipeListItem)

const styles = StyleSheet.create({
  listItemView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.25,
    borderColor: colors.white,
    backgroundColor: '#18232e',
  },
  listItemImg: {
    width: 70,
    height: 70,
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
})
