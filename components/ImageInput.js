import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import { addImageUrl, setLoading } from '../redux'

import colors from '../config/colors'
import defaultStyles from '../config/defaultStyles'

const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/cooked-images/image/upload'
const uploadPreset = 'atmiftkx'

// add a remove image option later on
const ImageInput = ({ addImageUrl, recipe, isLoading, setLoading }) => {
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
        setLoading(true)
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
            await addImageUrl(data.url)
            setLoading(false)
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
        {isLoading && (
          <Text style={[defaultStyles.text, styles.loadingMsg]}>
            Loading...
          </Text>
        )}
        {!recipe.imageUrl.length && (
          <MaterialCommunityIcons
            name="camera-plus"
            size={75}
            color={colors.white}
            onPress={selectImage}
          />
        )}
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
  isLoading: state.recipe.isLoading,
})

const mapDispatch = (dispatch) => ({
  addImageUrl: (imageUrl) => dispatch(addImageUrl(imageUrl)),
  setLoading: (bool) => dispatch(setLoading(bool)),
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
    borderTopWidth: 0.25,
    borderTopColor: colors.white,
  },
  img: {
    resizeMode: 'cover',
    opacity: 0.75,
    width: '100%',
    height: '100%',
  },
  loadingMsg: {
    bottom: 30,
    color: colors.pink,
  },
})
