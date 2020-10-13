import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { logout } from '../redux'
import { connect } from 'react-redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const UserProfileInfo = ({ logout, nav }) => {
  let handleSubmit = () => {
    logout()
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'enter imageUrl once backend/redux is done' }}
        style={styles.profileImg}
      />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text style={[defaultStyles.text]}>First Name Last Name</Text>
      <Text style={[defaultStyles.text, styles.textMargin, styles.textBold]}>
        @username
      </Text>
      <View style={styles.followDataView}>
        <Text style={[defaultStyles.text, styles.textMargin]}># Followers</Text>
        <Text style={[defaultStyles.text, styles.textMargin]}># Following</Text>
      </View>
    </View>
  )
}

const mapState = (state) => ({
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  logout: () => dispatch(logout()),
})

export default connect(mapState, mapDispatch)(UserProfileInfo)

const styles = StyleSheet.create({
  container: {
    height: '45%',
    borderBottomWidth: 0.25,
    borderBottomColor: colors.white,
    alignItems: 'center',
    padding: 15,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderWidth: 0.5,
    borderRadius: 75,
    borderColor: colors.white,
    marginBottom: 10,
  },
  textMargin: {
    marginVertical: 10,
  },
  textBold: {
    fontWeight: 'bold',
  },

  followDataView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
})

// export default UserProfileInfo
