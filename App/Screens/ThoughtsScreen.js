import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import ThoughtsFeed from '../Components/ThoughtsFeed';
import Home from '../Screens/HomeScreen';

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

var thoughtsBackgroundColor = (mood) => {
  if (mood == 'EXCITED') {
    return '#F291C7'
  } else if (mood == 'CONTENT') {
    return '#EDC63C'
  } else if (mood == 'BORED') {
    return '#FEBB58'
  } else if (mood == 'STRESSED') {
    return '#81CE63'
  } else {
    return '#95B3ED'
  }
}

const accentColor = () => {
    return "#003498";
}


export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{flexDirection: 'row', flex: 1, justifyContent: "space-evenly", alignItems: "center"}}>
          <Image
            source={require("../Images/write.png")}
            style={{ width: height * 0.03, height: height * 0.03, opacity: 0, marginLeft: 16.34/375 * width}}
          />
          <Text style={thoughtsStyles.headerText}>Team Thoughts</Text>
          <TouchableOpacity
          style={{marginRight: 16.34/375 * width}}
          onPress={() => {
            navigation.navigate('AddThoughtScreen', {mood: mood});
          }}>
            <Image
              source={require("../Images/write.png")}
              style={{ width: height * 0.04, height: height * 0.04, justifyContent: "center"}}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: backgroundColor(mood),
        borderBottomWidth: 0,
        height: height * 0.07,
      }
    };
  };

  state = {
    moodColor: thoughtsBackgroundColor(mood),
  };

  updateMood = () => {
    this.setState(moodColor => (
      { moodColor: thoughtsBackgroundColor(mood) }
    ));
    if(!this.props.navigation) {
      return;
    }
    this.props.navigation.setParams(mood)
  }

  componentDidMount(){
    setInterval(() => (
      this.state.moodColor != thoughtsBackgroundColor(mood) ?
      this.updateMood() : ""
    ), 500);
  }


  onActionRequested = (action) => {
    if(action === "create") {
      this.props.navigation.navigate("CreateTaskOne", {mood: mood});
    } else if (action !== "waiting") {
      this.props.navigation.navigate(action, {mood: mood});
    }
  }

  render() {
    const params = this.props.navigation.state.params || {};
    const getnew = params.getnew;
    const text = params.text;
    return (
      <View style={thoughtsStyles.container}>
        <ThoughtsFeed onActionRequested={this.onActionRequested} accentColor={this.state.moodColor} getNewData={getnew} text={text}/>
      </View>
    );
  }
}

const thoughtsStyles = StyleSheet.create({
  container: {
    marginTop: height * 0.012,
    flex: 1,
  },
  displayText: {
    flex: 1,
    fontSize: 40/375 * width,
    fontStyle: 'italic',
    fontWeight: '200',
    color: 'black',
    padding: '15%',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: height * 0.035,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: 'Lato-Black'
  }
});
