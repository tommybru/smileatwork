import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, ActivityIndicator, TouchableOpacity, Share, AsyncStorage, Dimensions } from 'react-native';
import { Metrics, Images, Colors } from '../Themes';
import { material } from 'react-native-typography';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import styles from './Styles/FeedItem.styles';
import AppConfig from '../Config/AppConfig';
import ProfileImages from './ProfileImageCollection.js';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../selection.json';
const expoAssetId = require("../../assets/fonts/icomoon.ttf");
const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', expoAssetId);
var { height, width } = Dimensions.get('window');


var textAccentColor = (color) => {
  if (color == '#F291C7') {
    return '#C50A7A'
  } else if (color == '#EDC63C') {
    return '#E7A600'
  } else if (color == '#FEBB58') {
    return '#DD5D00'
  } else if (color == '#81CE63') {
    return '#167904'
  } else {
    return '#003498'
  }
}

var strokeAccentColor = (color) => {
  if (color == '#F291C7') {
    return 'rgba(197, 10, 122, 0.5)'
  } else if (color == '#EDC63C') {
    return 'rgba(231, 166, 0, 0.5)'
  } else if (color == '#FEBB58') {
    return 'rgba(221, 92, 0, 0.5)'
  } else if (color == '#81CE63') {
    return 'rgba(22, 121, 4, 0.5)'
  } else {
    return 'rgba(0, 53, 152, 0.5)'
  }
}

export default class ThoughtsFeedItem extends React.Component {
  static defaultProps = { content: {} }

  static propTypes = {
    content: PropTypes.object.isRequired,
    onProfilePressed: PropTypes.func,
  }

  state = {
    loading: false,
    liked: false,
    favs: 0,
  }

  componentDidMount = async () => {
    const { content = {} } = this.props;
    this.setState({ favs: content.favs });
    const { accentColor } = this.props;
  }

  likeThis = () => {
    const { content = {} } = this.props;
    this.setState({ liked: !this.state.liked });
    if (this.state.liked) {
      this.setState({ favs: content.favs });
    } else {
      this.setState({ favs: content.favs + 1 });
    }
  }

  actionPressed = (action) => {
    this.props.onActionPressed(action);
  }


  render() {
    const { content = {} } = this.props;
    var actionText = "";
    var actionFontColor = "black";
    var actionFontSize = 0;
    var actionFont = 'Lato-Bold'
    if (content.action === "create") {
      actionText = "CREATE TASK";
      actionFontColor = textAccentColor(this.props.accentColor);
      actionFontSize = height * 0.025;
    } else if (content.action === "waiting") {
      actionFont = 'Lato-LightItalic'
      actionText = "Needs 5 likes to Create Task";
      actionFontColor = "grey";
      actionFontSize = height * 0.02;
    } else {
      actionText = "VIEW TASK";
      actionFontColor = this.props.accentColor;
      actionFontSize = height * 0.025;
    }
    return (
      <View style={{ borderColor: strokeAccentColor(this.props.accentColor), borderWidth: 1, margin: 9, marginTop: 3, padding: 9, borderRadius: 7 }}>
        <View style={styles.upperRow}>
          <Image
            source={ProfileImages[content.profile]}
            style={{ width: height * 0.05, height: height * 0.05, marginTop: height * 0.005, marginRight: width * 0.013 }}
            resizeMode='contain'
          />
          <View style={styles.textContainer}>
            <Text style={{ fontSize: height * 0.03 }}>{content.text}</Text>
          </View>
        </View>
        <View style={styles.lowerRow}>
          <TouchableOpacity
            onPress={() => {
              this.actionPressed(content.action);
            }}>
            <Text style={{ fontFamily: actionFont, fontSize: actionFontSize, color: actionFontColor }}>{actionText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row'}}
            onPress={this.likeThis}
          >
            <Text style={{fontSize: height * 0.018,
              marginRight: width * 0.0093,
              color: "#828282",
              fontFamily: 'Lato-Regular'}}>{this.state.favs}</Text>
            <CustomIcon name={this.state.liked ? "heart-filled" : "heart-outline"}
              size={height * 0.023}
              color={this.state.liked ? "#C7072A" : "#828282"}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}
