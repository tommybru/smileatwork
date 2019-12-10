import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import Home from '../Screens/HomeScreen';
import TaskMiami from '../Screens/TaskMiami';
import { AsyncStorage } from 'react-native';

var { height, width } = Dimensions.get('window');

var backgroundColor = (mood) => {
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


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
          <Text style={TasksStyles.headerText}>Team Tasks</Text>
      ),
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: backgroundColor(mood),
        borderBottomWidth: 0,
        height: height * 0.07,
      },
      headerTitleStyle: {
        flex: 1,
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: "auto"
      },
    };
  };

  updateMood = () => {
    if (!this.props.navigation) {
      return;
    }
    this.props.navigation.setParams(mood)
  }

  componentDidMount(){
    try{
      AsyncStorage.clear();
    } catch (error) {
      console.warn("async");
    }

    this.colorTimer = this.colorTimer = setInterval(() => (
      this.props.navigation.state.params.mood != backgroundColor(mood) ?
        this.updateMood() : ""
    ), 500);

  }

  componentWillUnmount() {
    clearInterval(this.colorTimer);
  }


  render() {
    return (
      <View style={{ flex: 1}}>
        <ScrollView>
          <Text style={[TasksStyles.title, { paddingTop: height * 0.03, paddingLeft: 14.706/375 * width, paddingBottom: height * 0.023 }]}>Tasks You’ve Joined</Text>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={[TasksStyles.task, { justifyContent: 'center' }]}
              onPress={() => { this.props.navigation.navigate('TaskMiami', { mood: mood }) }}
            >
              <Text style={{ left: width * 0.064, fontFamily: 'Lato-Regular', fontSize: height * 0.03 }}>Miami Trip</Text>
              <Text style={{ fontSize: height * 0.02, fontFamily: 'Lato-Italic', color: accentColor(mood), left: width * 0.065 }}>Expires Dec 12, 2019</Text>
            </TouchableOpacity>
          </View>

          <Text style={[TasksStyles.title, { paddingTop: height * 0.06, paddingLeft: 14.706/375 * width, paddingBottom: height * 0.01 }]}>All Tasks</Text>
          <View style={TasksStyles.categoryContainer}>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('OffsitesScreen', { mood: mood }) }}
            >
              <Image
                source={require("../Images/TaskCategories/offsites.png")}
                style={{
                  height: width * 0.23,
                  justifyContent: 'center'
                }}
                resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('OfficeEventsScreen', { mood: mood }) }}
            >
              <Image
                source={require("../Images/TaskCategories/officeEvents.png")}
                style={{
                  height: width * 0.28,
                  justifyContent: 'center'
                }}
                resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('OfficeSpaceScreen', { mood: mood }) }}
            >
              <Image
                source={require("../Images/TaskCategories/officeSpace.png")}
                style={{
                  height: width * 0.28,
                  justifyContent: 'center'
                }}
                resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('InclusivityScreen', { mood: mood }) }}
            >
              <Image
                source={require("../Images/TaskCategories/inclusivity.png")}
                style={{
                  height: width * 0.26,
                  justifyContent: 'center'
                }}
                resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('FoodScreen', { mood: mood }) }}
            >
              <Image
                source={require("../Images/TaskCategories/food.png")}
                style={{
                  height: width * 0.26,
                  justifyContent: 'center'
                }}
                resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('OtherScreen', { mood: mood }) }}
            >
              <Image
                source={require("../Images/TaskCategories/other.png")}
                style={{
                  height: width * 0.20,
                  justifyContent: 'center'
                }}
                resizeMode='contain'/>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const TasksStyles = StyleSheet.create({
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: height * 0.03
  },
  task: {
      width: width * 0.92,
      height: height * 0.109,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#BDBDBD',
      margin: width * 0.013
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryItem: {
    alignItems: 'center',
    height: width * 0.4,
    width: width * 0.4,
    margin: 10.5/375 * width,
    borderRadius: height * 0.012,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: height * 0.035,
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: 'Lato-Black'
  }
});
