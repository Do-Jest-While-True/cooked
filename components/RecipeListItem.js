import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

import colors from '../config/colors'
import user from '../redux/user'

const RecipeListItem = ({ id, name, imageUrl, time, nav, user }) => {
  return (
    <TouchableOpacity
      style={styles.listItemView}
      onPress={() => nav.navigate('Recipe', { id })}
    >
      <Image source={{ uri: imageUrl }} style={styles.listItemImg} />
      <View>
        <Text style={styles.listItemName}>{name}</Text>
        <Text style={styles.listItemName}>
          {user.firstName} {user.lastName}
        </Text>
        <View style={styles.timeView}>
          <MaterialIcons name="timer" size={18} color={colors.white} />
          <Text style={styles.listItemTime}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RecipeListItem

const styles = StyleSheet.create({
  listItemView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.25,
    borderColor: colors.white,
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
    marginBottom: 8,
    color: colors.darkGray,
  },
  listItemTime: {
    color: '#fff',
    marginLeft: 5,
  },
  timeView: {
    flexDirection: 'row',
  },
})
