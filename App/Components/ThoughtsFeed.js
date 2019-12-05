import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { getPopularPhotos } from '../API/Unsplash.js';
import { material } from 'react-native-typography';
import { Metrics } from '../Themes';
import ThoughtsFeedItem from '../Components/ThoughtsFeedItem';
import { Entypo } from '@expo/vector-icons';
import firestore from '../../firebase.js';
import firebase from 'firebase';

export default class ThoughtsFeed extends React.Component {

  static defaultProps = { content: null }

  state = {
    loading: true,
    feedEntries: [],
    moodColor: "",
    justAddedText: "",
  }

  componentDidMount(){
    if (this.props.content) {
      this.setState({feedEntries: this.props.content});
    } else {
      this.getFeedData();
    }
    setInterval(() => (
    ((this.state.moodColor != this.props.accentColor) || (this.props.getNewData && (this.state.justAddedText != this.props.text))) ?
        this.getFeedData() : ""
    ), 1000);
  }

  getFeedData = async () => {
      this.setState({loading: true});
      try {
        let feedEntriesRef = firestore.collection('Thoughts');
        let allEntries = await feedEntriesRef.get();
        let array = []
        allEntries.forEach((thought) => {
          array.push(thought.data());
        })
        this.setState({feedEntries: array})
      } catch (error) {
        console.log(error);
      }
      this.setState({loading: false});
      this.setState({moodColor: this.props.accentColor});
      if(this.props.getNewData) {
        this.setState({justAddedText: this.props.text});
      }
      this.props.getNewData = false;
      return ([]);
  }

  onActionPressed = (action) => {
    this.props.onActionRequested(action);
  }

  renderItem = ({item}) => {
    return (
      <ThoughtsFeedItem
        content={item}
        onActionPressed={this.onActionPressed}
        accentColor={this.props.accentColor}
        getNewData={this.props.getNewData}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getTabContent()}
      </View>
    );
  }

  getTabContent = () => {
    const { loading } = this.state;
    if (loading) {
      return (
        <ActivityIndicator size="large"/>
      );
    } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
            data={this.state.feedEntries}
            renderItem={this.renderItem}
            keyExtractor={ (item, index) => index.toString()}
        />
      </SafeAreaView>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
