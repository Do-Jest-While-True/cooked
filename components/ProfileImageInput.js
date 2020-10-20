import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { addProfileImageUrl } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/cooked-images/image/upload'
const uploadPreset = 'atmiftkx'

const ProfileImageInput = ({ addProfileImageUrl, me }) => {
  console.log('me in ProfileImageInput')
  console.log('---------------------------------')
  console.log(me)
  console.log('---------------------------------')

  const [localImageUri, setLocalImageUri] = useState()

  const requestPermission = async () => {
    const result = await ImagePicker.requestCameraRollPermissionsAsync()
    if (!result.granted) {
      alert('Please enable permissions to access the library')
    }
  }

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        // images only -- no video
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // reformat for cloudinary
        base64: true,
      })
      // conditional so nothing happens if user cancels inside the image selector
      if (result.cancelled) {
        return
      } else {
        setLocalImageUri(result.uri)
        let base64Img = `data:image/jpg;base64,${result.base64}`
        let data = {
          file: base64Img,
          upload_preset: uploadPreset,
        }

        // refactor to try-catch
        fetch(CLOUDINARY_URL, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        })
          .then(async (r) => {
            let data = await r.json()
            // put cloudinary uri onto state ⬇️
            await addProfileImageUrl(data.url)
          })
          .catch((err) => console.log(err))
      }
    } catch (error) {
      console.log('Error Reading Image')
    }
  }

  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={selectImage} style={styles.addImgBtn}>
      {/* <Image source={{ uri: localImageUri }} style={{}} /> */}
      <Text style={styles.btnText}>Click to add Profile Image</Text>
    </TouchableWithoutFeedback>
  )
}

const mapState = (state) => ({
  me: state.user.me,
})

const mapDispatch = (dispatch) => ({
  addProfileImageUrl: (imageUrl) => dispatch(addProfileImageUrl(imageUrl)),
})

export default connect(mapState, mapDispatch)(ProfileImageInput)

const styles = StyleSheet.create({
  addImgBtn: {
    marginBottom: 30,
  },
  btnText: {
    color: colors.white,
  },
})
