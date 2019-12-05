import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard, Image, Dimensions, TextInput } from 'react-native';
import { material, human } from 'react-native-typography';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import ThoughtsFeed from '../Components/ThoughtsFeed';
import { getFeedData } from '../Components/ThoughtsFeed';
import Home from '../Screens/HomeScreen';
import firestore from '../../firebase.js';
import firebase from 'firebase';

var { height, width } = Dimensions.get('window');

var homeScreenBackgroundColor = (mood) => {
  if (mood == 'EXCITED') {
    return '#F291C7'
  } else if (mood == 'CONTENT') {
    return '#FCE781'
  } else if (mood == 'BORED') {
    return '#FEBB58'
  } else if (mood == 'STRESSED') {
    return '#81CE63'
  } else {
    return '#95B3ED'
  }
}

var accentColor = (mood) => {
  if (mood == 'EXCITED') {
    return '#B5006C'
  } else if (mood == 'CONTENT') {
    return '#E7A600'
  } else if (mood == 'BORED') {
    return '#DD5D00'
  } else if (mood == 'STRESSED') {
    return '#167904'
  } else {
    return '#003498'
  }
}
const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Lato-Black',
        fontSize: 22,
        textAlign: "center"
    }
})

export default class ThoughtsScreen extends React.Component {

  onChangeText = text => {
    this.setState({thoughtText: text});
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight:<View style={{padding:6}}></View>,
      headerTitle: (
        <Text style={thoughtsStyles.headerText}>Add Thought</Text>
      ),
      headerStyle: {
        backgroundColor: homeScreenBackgroundColor(mood),
        borderBottomWidth: 0,
        height: height * 0.04,
      }
    };
  };

  state = {
    thoughtText: "",
    anonymous: true,
  };

  postThought(){
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '' + (tempDate.getMonth()+1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds();
    date = 120191231245959 - date;
    firestore.collection("Thoughts").doc(date.toString()).set({
        action: "waiting",
        favs: "",
        profile: this.state.anonymous ? "anon" : "charlie",
        text: this.state.thoughtText,
    })
    this.props.navigation.navigate('ThoughtsScreen', {getnew: true, text: this.state.thoughtText});
  }

  updateMood = () => {
    if(!this.props.navigation) {
      return;
    }
    this.props.navigation.setParams(mood)
  }

  componentDidMount(){
    setInterval(() => (
      this.state.moodColor != accentColor(mood) ?
      this.updateMood() : ""
    ), 500);
  }

  toggleAnonymous = (value) => {
    this.setState({anonymous: value});
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        <SafeAreaView style={thoughtsStyles.container}>
            <Text style={human.largeTitle}>Add a Thought</Text>
            <TextInput
                style={thoughtsStyles.textinput}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.thoughtText}
                placeholder="I think ..."
                multiline={true}
            />
            <View style={{marginTop: 10, alignSelf: "center"}}>
              <Text style={{fontSize: height * 0.025}}>Post as</Text>
            </View>
            <View>
              {this.getTabContent()}
            </View>
            <TouchableOpacity
            style={{
              backgroundColor: accentColor(mood),
              opacity: 0.8,
              paddingTop: height * 0.028,
              borderRadius: 100,
              width: height * 0.2,
              height: height * 0.08,
              alignSelf: "center",
              marginTop: height * 0.028,
            }}
              onPress={() => {
                this.postThought()
              }}>
              <Text style={{
                fontFamily:'Lato-Bold',
                fontSize: height * 0.02,
                alignSelf: 'center',
                color: '#FFFFFF'
              }}> POST </Text>
            </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  getTabContent = () => {
    return (
      <View style={{marginTop: 10, alignSelf: "center", flexDirection: "row"}}>
        <View style={{opacity: this.state.anonymous ? 1 : 0.2}}>
          <TouchableOpacity style ={{marginRight: height * 0.025}}
          onPress={() => this.toggleAnonymous(true)}>
            <Image
              source={require("../../App/Images/ProfileImages/anon-icon.png")}
              style={{height: height * 0.1, width: height * 0.1, alignSelf: "center", borderColor: this.state.anonymous ? accentColor(mood) : "white", borderWidth: height * 0.003, borderRadius: height * 0.05}}
            />
            <Text style={{fontSize: height * 0.018, color: this.state.anonymous ? accentColor(mood) : "#000", alignSelf: "center"}}>ANONYMOUS</Text>
          </TouchableOpacity>
        </View>
        <View style={{opacity: this.state.anonymous ? 0.2 : 1}}>
        <TouchableOpacity style={{marginLeft: height * 0.025}}
        onPress={() => this.toggleAnonymous(false)}>
            <Image
              source={require("../../App/Images/ProfileImages/charlie.png")}
              style={{height: height * 0.1,
              width: height * 0.1,
              alignSelf: "center",
              marginBottom: 1,
              borderColor: this.state.anonymous ? "white" : accentColor(mood),
              borderWidth: height * 0.003,
              borderRadius: height * 0.05}}
            />
            <Text style={{fontSize: height * 0.018, color: this.state.anonymous ? "#000" : accentColor(mood), alignSelf: "center"}}>CHARLIE</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const thoughtsStyles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1,
  },
  SearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    margin: 5,
    borderRadius: 10
  },
  textinput: {
    height: height * 0.4,
    borderRadius: 10,
    padding: 20,
    paddingTop: 10,
    marginTop: 10,
    borderColor: '#AAA',
    borderWidth: 1.5,
    fontSize: height * 0.03,
    color: '#555',
  },
  Image: {
    justifyContent: 'flex-end',
    marginEnd: 10,
    flex: 2,
  },
  headerText: {
    fontSize: height * 0.03,
    fontWeight: "500",
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto"
  }
});
