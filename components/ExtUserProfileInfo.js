import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const ExtUserProfileInfo = ({ user, me }) => {
  const handleFollow = () => {
    // follow functionality
  }

  console.log('user in ExtProfileInfo----->', user)
  console.log('me in ext-->', me)

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.user.profileImageUrl }}
        style={styles.profileImg}
      />
      <Text style={[defaultStyles.text]}>
        {user.user.firstName} {user.user.lastName}
      </Text>
      <Text style={[defaultStyles.text, styles.textMargin, styles.textBold]}>
        @{user.user.username}
      </Text>
      <TouchableOpacity onPress={() => handleFollow()} style={styles.followBtn}>
        <Text style={[defaultStyles.smallText, styles.textBold]}>Follow</Text>
      </TouchableOpacity>
      <View style={styles.followDataView}>
        <Text style={[defaultStyles.text, styles.textMargin]}>
          {user.followers.length} Followers
        </Text>
        <Text style={[defaultStyles.text, styles.textMargin]}>
          {user.following.length} Following
        </Text>
      </View>
    </View>
  )
}

const mapDispatch = (dispatch) => ({})

export default connect(null, mapDispatch)(ExtUserProfileInfo)

const styles = StyleSheet.create({
  container: {
    height: 375,
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
    marginVertical: 18,
  },
  textBold: {
    fontWeight: 'bold',
  },
  followDataView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  followBtn: {
    backgroundColor: colors.pink,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
})
