import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard, Image, Dimensions, TextInput } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import ThoughtsFeed from '../Components/ThoughtsFeed';
import Home from '../Screens/HomeScreen';
import firestore from '../../firebase.js';
import firebase from 'firebase';

var { height, width } = Dimensions.get('window');

var backgroundColor = (mood) => {
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
    this.setState({ thoughtText: text });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTintColor: 'black',
      headerRight: <View style={{ padding: 6 }}></View>,
      headerStyle: {
        borderBottomWidth: 0,
        height: height * 0.04,
      }
    };
  };

  state = {
    thoughtText: "",
    anonymous: true,
  };

  postThought() {
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '' + (tempDate.getMonth() + 1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds();
    date = 120191231245959 - date;
    firestore.collection("Thoughts").doc(date.toString()).set({
      action: "waiting",
      favs: "",
      profile: this.state.anonymous ? "anon" : "charlie",
      text: this.state.thoughtText,
    })
    this.props.navigation.navigate('ThoughtsScreen', { getnew: true, text: this.state.thoughtText });
  }

  updateMood = () => {
    if (!this.props.navigation) {
      return;
    }
    this.props.navigation.setParams(mood)
  }

  componentDidMount() {
    setInterval(() => (
      this.state.moodColor != accentColor(mood) ?
        this.updateMood() : ""
    ), 500);
  }

  toggleAnonymous = (value) => {
    this.setState({ anonymous: value });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={thoughtsStyles.container}>
          <Text style={{
            fontFamily: 'Lato-Bold',
            fontSize: height * 0.05,
            textAlign: 'left',
            marginTop: height * 0.01,
            marginBottom: height * 0.02,
            marginLeft: (5 / 375) * width,
          }}>Add a Thought</Text>
          <TextInput
            style={thoughtsStyles.textinput}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.thoughtText}
            placeholder="I think ..."
            multiline={true}
          />
          <View style={{ marginTop: (40/817) * height, marginBottom: (10/817) * height, alignSelf: "center" }}>
            <Text style={{ fontSize: height * 0.025 }}>Post as</Text>
          </View>
          <View>
            {this.getTabContent()}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: accentColor(mood),
              opacity: 0.8,
              borderRadius: 7,
              width: (196 / 375) * width,
              height: (47 / 812) * height,
              alignSelf: 'center',
              marginTop: (40 / 812) * height,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => { this.postThought() }}
          >
            <Text style={{
              fontFamily: 'Lato-Bold',
              fontSize: height * 0.03,
              alignSelf: 'center',
              textAlign: 'center',
              color: '#FFFFFF',
            }}>NEXT</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  getTabContent = () => {
    return (
      <View style={{ justifyContent: 'center', alignSelf: "center", flexDirection: "row" }}>
        <View style={{ opacity: this.state.anonymous ? 1 : 0.2 }}>
          <TouchableOpacity style={{ marginRight: height * 0.025 }}
            onPress={() => this.toggleAnonymous(true)}>
            <Image
              source={require("../../App/Images/ProfileImages/anon-icon.png")}
              style={{
                height: height * 0.1,
                width: height * 0.1,
                alignSelf: "center",
                borderColor: this.state.anonymous ? accentColor(mood) : "white",
                borderWidth: (Platform.OS === 'ios') ? height * 0.004 : 0,
                borderRadius: (height * 0.05)
              }}
              resizeMode='contain'
            />
            <Text style={{
              fontSize: height * 0.02,
              color: this.state.anonymous ? accentColor(mood) : "#000",
              alignSelf: "center",
              paddingTop: height * 0.012,
              fontFamily: 'Lato-Bold'
            }}>ANONYMOUS</Text>
          </TouchableOpacity>
        </View>
        <View style={{ opacity: this.state.anonymous ? 0.2 : 1 }}>
          <TouchableOpacity style={{ marginLeft: height * 0.025 }}
            onPress={() => this.toggleAnonymous(false)}>
            <Image
              source={require("../../App/Images/ProfileImages/charlie.png")}
              style={{
                height: height * 0.1,
                width: height * 0.1,
                alignSelf: "center",
                borderColor: this.state.anonymous ? "white" : accentColor(mood),
                borderWidth: (Platform.OS === 'ios') ? height * 0.004 : 0,
                borderRadius: (height * 0.05)
              }}
              resizeMode='contain'
            />
            <Text style={{
              fontSize: height * 0.02,
              color: this.state.anonymous ? '#828282' : accentColor(mood),
              alignSelf: "center",
              paddingTop: height * 0.012,
              fontFamily: 'Lato-Bold'
            }}>CHARLIE</Text>
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
    borderRadius: 10
  },
  textinput: {
    height: height * 0.3,
    borderRadius: 10,
    marginHorizontal: (5/375) * width,
    padding: (20/375) * width,
    paddingTop: (10/812) * height,
    marginTop: (10/812) * height,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    fontSize: height * 0.03,
    fontFamily: 'Lato-Regular',
    color: 'black',
  },
  Image: {
    justifyContent: 'flex-end',
    marginEnd: (10/812) * height,
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
