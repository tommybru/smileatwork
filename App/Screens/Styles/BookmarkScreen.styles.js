
import { StyleSheet } from 'react-native';
import { Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: Metrics.marginVertical,
  },
  bookmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.marginVertical,
    marginBottom: Metrics.marginVertical,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
  },
  thumbImage: {
    width: Metrics.images.large,
    height: Metrics.images.large,
  },
});
