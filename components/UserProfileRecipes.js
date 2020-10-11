import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'
import GridList from 'react-native-grid-list'

import { getRecipes } from '../redux/recipes'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

// refactor to class ???
const UserProfileRecipes = ({ recipes, getRecipes }) => {
  useEffect(() => {
    ;(async () => await getRecipes())()
  }, [])

  return (
    recipes && (
      <GridList
        showSeparator
        data={recipes}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <Image
                source={{
                  uri: tempImgUrl,
                }}
                style={styles.gridImg}
              />
              {/* <Text>{item.name}</Text> */}
            </TouchableOpacity>
          )
        }}
      />
    )
  )
}

const mapState = (state) => ({
  recipes: state.recipes,
})

const mapDispatch = (dispatch) => ({
  getRecipes: () => dispatch(getRecipes()),
})

export default connect(mapState, mapDispatch)(UserProfileRecipes)

const styles = StyleSheet.create({
  gridImg: {
    width: '100%',
    height: '100%',
  },
})

const tempImgUrl =
  'https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1579721909133-R2KSZ8VGDGBI90DYATBK/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/header4.jpg?format=2500w'
