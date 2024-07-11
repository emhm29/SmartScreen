import ImagePicker from 'react-native-image-picker';

const pickImage = () => {
  ImagePicker.showImagePicker({}, (response) => {
    if (!response.didCancel && !response.error) {
      const imageUrl = response.uri
    }
  })
}