import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { addProfileImageUrl } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/cooked-images/image/upload'
const uploadPreset = 'atmiftkx'

const ProfileImageInput = ({
  addProfileImageUrl,
  uploadMessage,
  setUploadMessage,
}) => {
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
            // display upload saved message:
            setUploadMessage(true)
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
    <React.Fragment>
      {/* EDIT PROFILE PHOTO BTN */}
      <TouchableOpacity onPress={selectImage} style={styles.addImgBtn}>
        <Text style={[defaultStyles.smallText, styles.btnText]}>
          Edit Profile Photo
        </Text>
      </TouchableOpacity>
      {/* PROFILE PHOTO SAVED MESSAGE */}
      {uploadMessage && (
        <Text style={[defaultStyles.smallText, styles.photoSavedMsg]}>
          Profile Photo Saved!
        </Text>
      )}
    </React.Fragment>
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
    width: 175,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: colors.pink,
  },
  btnText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  photoSavedMsg: {
    color: colors.pink,
  },
})
