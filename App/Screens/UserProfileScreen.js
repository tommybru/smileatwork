import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { getPhotosForUser } from '../API/Unsplash.js';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../Themes';
import { Entypo } from '@expo/vector-icons';

export default class UserProfileScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    const username = params.username;

    return {
      headerTitle: (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={material.body2}>Unsplash</Text>
          <Text style={[material.caption, {fontSize: 10}]}>{username}</Text>
        </View>
      )
    };
  };

  state = {
    content: {},
    loading: true,
    user: {},
  }

  componentDidMount() {
    if(!this.props.navigation) return;

    const params = this.props.navigation.state.params || {};
    const username = params.username;
    this.loadUserContent(username);
  }

  loadUserContent = async (username) => {
    this.setState({loading: true});
    await this.sleep(500);
    getPhotosForUser(json => {
      console.log(json);
      this.setState({content: json, loading: false});

      if (json[0]){
        this.setState({user: json[0].user});
      }
    }, username);
  }

  render() {
    const { content } = this.state;

    return (
      <View style={styles.container}>

        {this.getFeedContent()}

      </View>
    );
  }

  getUserContent = () => {
    const { user } = this.state;
    if (!user.id) return null;

    return (
      <View style={styles.userContainer}>
        <Text style={material.display1}>{user.name}</Text>
        <Text style={material.body1}>{user.bio || 'No Bio'}</Text>
        <Text style={material.caption}>{user.location || 'No Location'}</Text>
      </View>
    );
  }

  getFeedContent = () => {
    const { loading, content } = this.state;

    if (loading) {
      return (
        <ActivityIndicator />
      );
    } else {
      return (
        <Feed content={content} listHeaderComponent={this.getUserContent()}/>
      );
    }
  }

  sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.snow,
  },
  userContainer: {
    flexDirection: 'column',
    padding: Metrics.doubleBaseMargin,
  },
  userImage: {
    width: Metrics.images.large,
    height: Metrics.images.large,
  }
});
