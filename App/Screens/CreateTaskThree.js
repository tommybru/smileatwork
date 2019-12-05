import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { material } from 'react-native-typography';
import Home from '../Screens/HomeScreen';

var { height, width } = Dimensions.get('window');

var homeScreenBackgroundColor = (mood) => {
  if (mood == 'EXCITED') {
    return '#F291C7'
  } else if (mood == 'CONTENT') {
    return '#FCE781'
  } else if (mood == 'BORED') {
    return '#FEBB58'
  } else if (mood == 'STRESSED') {
    return '#8EDA80'
  } else {
    return '#95B3ED'
  }
}

var accentColorMuted = (mood) => {
  if (mood == 'EXCITED') {
    return 'rgba(242, 145, 199, 0.5)'
  } else if (mood == 'CONTENT') {
    return 'rgba(252, 231, 129, 0.5)'
  } else if (mood == 'BORED') {
    return 'rgba(254, 187, 88, 0.5)'
  } else if (mood == 'STRESSED') {
    return 'rgba(142, 218, 128, 0.5)'
  } else {
    return 'rgba(149, 179, 237, 0.5)'
  }
}

var accentColor = (mood) => {
  if (mood == 'EXCITED') {
    return '#C50A7A'
  } else if (mood == 'CONTENT') {
    return '#E78B00'
  } else if (mood == 'BORED') {
    return '#DD5D00'
  } else if (mood == 'STRESSED') {
    return '#167904'
  } else {
    return '#003498'
  }
}

export default class TasksScreen extends React.Component {

  state = {
    buttonPressedOffsites: false,
    buttonPressedEvents: false,
    buttonPressedSpace: false,
    buttonPressedInclusivity: false,
    buttonPressedFood: false,
    buttonPressedOther: false,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        </View>
      ),
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
      }
    };
  };

  setbuttonSelected() {
    this.setState({ buttonPressedSpace: true });
  }

  updateMood = () => {
    if(!this.props.navigation) {
      return;
    }
    this.setState({mood: this.props.navigation.state.params.mood});
  }

  componentDidMount(){
    setInterval(() => (
      this.props.navigation.state.params.mood != accentColor(mood) ?
      this.updateMood() : ""
    ), 500);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{
          fontFamily:'Lato-Bold',
          fontSize: 40,
          textAlign: 'left',
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 20,
        }}>Create Task</Text>
        <Text style={{
          fontFamily:'Lato-Bold',
          fontStyle: 'italic',
          fontSize: 20,
          textAlign: 'left',
          marginTop: 0,
          marginBottom: 30,
          marginLeft: 20,
        }}>Choose a category</Text>
        <ScrollView>
          <View style={TasksStyles.categoryContainer}>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedOffsites ? accentColor(mood) : accentColorMuted(mood) }]}
              onPress={() => {this.setbuttonSelected()}}
            >
              <Image
                source={require("../Images/TaskCategories/offsites.png")}
                style={{
                  height: 80,
                  width: 80, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedEvents ? accentColor(mood) : accentColorMuted(mood) }]}
              onPress={() => {this.setbuttonSelected()}}
            >
              <Image
                source={require("../Images/TaskCategories/officeEvents.png")}
                style={{
                  height: 110,
                  width: 75, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedSpace ? accentColor(mood) : accentColorMuted(mood) }]}
              onPress={() => {this.setbuttonSelected()}}
            >
              <Image
                source={require("../Images/TaskCategories/officeSpace.png")}
                style={{
                  height: 100,
                  width: 60, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedInclusivity ? accentColor(mood) : accentColorMuted(mood) }]}
              onPress={() => {this.setbuttonSelected()}}
            >
              <Image
                source={require("../Images/TaskCategories/inclusivity.png")}
                style={{
                  height: 85,
                  width: 110, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedFood ? accentColor(mood) : accentColorMuted(mood) }]}
              onPress={() => {this.setbuttonSelected()}}
            >
              <Image
                source={require("../Images/TaskCategories/food.png")}
                style={{
                  height: 80,
                  width: 50, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedOther ? accentColor(mood) : accentColorMuted(mood) }]}
              onPress={() => {this.setbuttonSelected()}}
            >
              <Image
                source={require("../Images/TaskCategories/other.png")}
                style={{
                  height: 70,
                  width: 84, justifyContent: 'center'
                }} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: accentColor(mood),
            opacity: 0.8,
            paddingTop: 18,
            borderRadius: 30,
            width: 245,
            height: 56,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 20
          }}
          onPress={() => {this.props.navigation.navigate("TasksWeeklyLunches", {mood: mood})}}
        >
          <Text style={{
            fontFamily:'Lato-Bold',
            fontSize: 20,
            alignSelf: 'center',
            color: '#FFFFFF',
          }}>CREATE</Text>
        </TouchableOpacity>
        <View style={TasksStyles.container}>
          <View style={TasksStyles.CircleShapeView}>
          </View>
          <View style={TasksStyles.CircleShapeView}>
          </View>
          <View style={{
            width: 12,
            height: 12,
            borderRadius: 12/2,
            marginLeft: 20,
            marginRight: 10,
            opacity: 0.8,
            backgroundColor: accentColor(mood),
          }}>
          </View>
        </View>
      </View>
    );
  }
}

const TasksStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  CircleShapeView: {
    width: 12,
    height: 12,
    borderRadius: 12/2,
    backgroundColor: '#BDBDBD',
    marginLeft: 20,
    marginRight: 10,
  },
  displayText: {
    flex: 1,
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: '200',
    color: 'black',
    padding: '15%',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    textAlign: "center"
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 20
  },
  task: {
    width: 345,
    height: 89,
    left: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#BDBDBD'
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // left: 4.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageIndicator: {
    height: 20,
    width: '20%',
    alignSelf: 'center',
    marginTop: 5,
  },
  categoryItem: {
    alignItems: 'center',
    height: 125,
    width: 125,
    margin: 10.5,
    opacity: 0.8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
    // flex: 1,
    // margin: 1,
  }
});
