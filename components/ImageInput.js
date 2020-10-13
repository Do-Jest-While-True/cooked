import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import { addImageUrl } from '../redux/recipe'

import colors from '../config/colors'

const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/cooked-images/image/upload'
const uploadPreset = 'atmiftkx'

// add a remove image option later on
const ImageInput = ({ addImageUrl }) => {
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
            addImageUrl(data.url)
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
  // NOTE: I learned that whatever you pass into this array will determine when useEffect is fired again. For example, if you want useEffect to rerender when a state var changes, you put that state var into the array. Leaving the array empty makes it function more like componentDidMount()

  return (
    <TouchableWithoutFeedback onPress={localImageUri && selectImage}>
      <View style={styles.container}>
        {!localImageUri && (
          <MaterialCommunityIcons
            name="camera-plus"
            size={75}
            color={colors.white}
            onPress={selectImage}
          />
        )}
        {localImageUri && (
          <Image source={{ uri: localImageUri }} style={styles.img} />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const mapDispatch = (dispatch) => ({
  addImageUrl: (imageUrl) => dispatch(addImageUrl(imageUrl)),
})

export default connect(null, mapDispatch)(ImageInput)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 400,
    borderBottomWidth: 0.25,
    borderBottomColor: colors.white,
  },
  img: {
    resizeMode: 'cover',
    opacity: 0.75,
    width: '100%',
    height: '100%',
  },
})
