import React from 'react'
import { StyleSheet, Image, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getRecipeTest } from '../redux/recipes'

class TestRecipe extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getRecipeTest()
    console.log(this.props.recipes)
  }
  render() {
    return <Text>Test</Text>
  }
}

const mapState = (state) => ({
  recipes: state.recipes,
})

const mapDispatch = (dispatch) => ({
  getRecipeTest: () => dispatch(getRecipeTest()),
})

export default connect(mapState, mapDispatch)(TestRecipe)
