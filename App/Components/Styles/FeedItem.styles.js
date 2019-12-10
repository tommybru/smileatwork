
import { StyleSheet, Dimensions } from 'react-native';
import { Metrics, Images, Colors } from '../../Themes';

var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    marginTop: 5,
  },
  item: {
    borderWidth: 1,
    margin: 5,
    marginTop: 3,
    padding: 2,
    borderRadius: 6,
  },
  upperRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
  lowerRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: height * 0.075,
  },
  textContainer: {
    marginLeft: Metrics.marginHorizontal,
    marginRight: height * 0.06,
  },
});
