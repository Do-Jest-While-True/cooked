import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import { addImageUrl } from '../redux'

import colors from '../config/colors'

const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/cooked-images/image/upload'
const uploadPreset = 'atmiftkx'

// add a remove image option later on
const ImageInput = ({ addImageUrl, recipe }) => {
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

  return (
    <TouchableWithoutFeedback onPress={localImageUri && selectImage}>
      <View style={styles.container}>
        {!recipe.imageUrl.length && (
          <MaterialCommunityIcons
            name="camera-plus"
            size={75}
            color={colors.white}
            onPress={selectImage}
          />
        )}
        {/* getting errors with && syntax below so I'm using ternary op to render an empty Image when no URI is on state --no styling implications with an empty Image */}
        {recipe.imageUrl.length ? (
          <Image source={{ uri: localImageUri }} style={styles.img} />
        ) : (
          <Image />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

const mapState = (state) => ({
  recipe: state.recipe,
})

const mapDispatch = (dispatch) => ({
  addImageUrl: (imageUrl) => dispatch(addImageUrl(imageUrl)),
})

export default connect(mapState, mapDispatch)(ImageInput)

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
