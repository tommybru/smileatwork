
import { StyleSheet, Dimensions } from 'react-native';
import { Metrics, Images, Colors } from '../../Themes';

var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    TaskTitle: {
      fontFamily: 'Lato-Bold',
      fontSize: height * 0.07,
      paddingTop: 25/ 817 * height ,
      paddingLeft: 20/375 * width,
      paddingRight: 20/375 * width
    },
    heading: {
      fontFamily: 'Lato-Black',
      fontSize: height * 0.035,
      textAlign: "center"
    },
    expirationDate: {
      fontSize: height * 0.03,
      paddingTop: 10/ 817 * height ,
      paddingLeft: 20/375 * width,
      fontFamily:'Lato-Italic'
    },
    taskDetails:{
      fontSize: height * 0.025,
      fontFamily:'Lato-Regular',
      paddingRight: 90/375 * width,
      marginTop: 30/ 817 * height ,
      paddingLeft: 20/375 * width,
    },
    collab:{
      fontSize: 25/375 * width,
      fontFamily:'Lato-Regular',
    }
});
