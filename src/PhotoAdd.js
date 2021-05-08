import * as ImagePicker from "react-native-image-picker";
import images from "./Photos";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const PhotoAdd = (navigation, route) => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {

      console.log('response', JSON.stringify(response));
      images.push(response.uri)
      navigation.navigate('General')
      navigation.navigate('Photo')
      //navigation.navigate('General')

    }
  });
};
export default PhotoAdd;
