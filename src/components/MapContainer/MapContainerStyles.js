import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapreact:{width: Dimensions.get('window').width, height: Dimensions.get('window').height},
  map: {
    ...StyleSheet.absoluteFillObject
  }
}

export default styles;
