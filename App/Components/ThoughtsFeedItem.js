import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image, ActivityIndicator, TouchableOpacity, Share, AsyncStorage, Dimensions } from 'react-native';
import { Metrics, Images, Colors } from '../Themes';
import { material } from 'react-native-typography';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import styles from './Styles/FeedItem.styles';
import AppConfig from '../Config/AppConfig';
import ProfileImages from './ProfileImageCollection.js';
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
    this.setState({favs: content.favs});
    const { accentColor } = this.props;
  }

  likeThis = () => {
    const { content = {} } = this.props;
    this.setState({liked: !this.state.liked});
    if(this.state.liked) {
      this.setState({favs: content.favs});
    } else {
      this.setState({favs: content.favs + 1});
    }
  }

  actionPressed = (action) => {
    this.props.onActionPressed(action);
  }


  render() {
    const { content = {} } = this.props;
    var actionText = "";
    var actionFontWeight = 0;
    var actionFontColor = "black";
    var actionFontSize = 0;
    if(content.action === "create") {
      actionText = "CREATE TASK";
      actionFontWeight = "600";
      actionFontColor = textAccentColor(this.props.accentColor);
      actionFontSize = height * 0.025;
    } else if(content.action === "waiting") {
      actionText = "Needs 5 likes to become a Task";
      actionFontWeight = "400";
      actionFontColor = "grey";
      actionFontSize = height * 0.02;
    } else {
      actionText = "VIEW TASK";
      actionFontWeight = "500";
      actionFontColor = this.props.accentColor;
      actionFontSize = height * 0.025;
    }
    return (
      <View style={{borderColor: this.props.accentColor, borderWidth: 1.5, margin: 5, marginTop: 3, padding: 2, borderRadius: 6}}>
        <View style={styles.upperRow}>
          <Image
            source={ProfileImages[content.profile]}
            style={{ width: height * 0.05, height: height * 0.05, marginTop: 5}}
          />
          <View style={styles.textContainer}>
            <Text style={{fontSize: height * 0.03}}>{content.text}</Text>
          </View>
        </View>
        <View style={styles.lowerRow}>
          <TouchableOpacity
          onPress={() => {
            this.actionPressed(content.action);
          }}>
            <Text style={{fontSize: actionFontSize, fontWeight: actionFontWeight, color: actionFontColor}}>{actionText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: "center"}}
            onPress={this.likeThis}
          >
            <Text style={{fontSize: height * 0.025, alignSelf: "center"}}>{this.state.favs}</Text>
            <Entypo
            name={this.state.liked ? "heart" : "heart-outlined"}
            size={height * 0.030}
            color={this.state.liked ? Colors.ember : "#828282"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}
