import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { material } from 'react-native-typography';
import Home from '../Screens/HomeScreen';
import TaskMiami from '../Screens/TaskMiami';

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


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={TasksStyles.headerText}>Team Tasks</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: homeScreenBackgroundColor(mood),
        borderBottomWidth: 0,
        height: height * 0.05,
      },
    };
  };

  updateMood = () => {
    if(!this.props.navigation) {
      return;
    }
    this.props.navigation.setParams(mood)
  }

  componentDidMount(){
    setInterval(() => (
      this.props.navigation.state.params.mood != homeScreenBackgroundColor(mood) ?
      this.updateMood() : ""
    ), 500);
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text style={[TasksStyles.title, { paddingTop: height * 0.03, paddingLeft: height * 0.018, paddingBottom: height * 0.023 }]}>Tasks You’ve Joined</Text>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={[TasksStyles.task, {justifyContent: 'center'}]}
              onPress={() => {this.props.navigation.navigate('TaskMiami', {mood: mood})}}
            >
              <Text style={{ left: height * 0.03, fontFamily: 'Lato-Regular', fontSize: height * 0.03 }}>Miami Trip</Text>
              <Text style={{ fontSize: height * 0.02, fontFamily: 'Lato-Italic', color: accentColor(mood), left: height * 0.027 }}> Expires in 1 day </Text>
            </TouchableOpacity>
          </View>

          <Text style={[TasksStyles.title, { paddingTop: height * 0.06, paddingLeft: height * 0.018, paddingBottom: height * 0.01 }]}>All Tasks</Text>
          <View style={TasksStyles.categoryContainer}>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('OffsitesScreen', {mood: mood}) }}
            >
              <Image
                source={require("../Images/TaskCategories/offsites.png")}
                style={{
                  height: height * 0.115,
                  width: height * 0.11, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('OfficeEventsScreen', {mood: mood}) }}
            >
              <Image
                source={require("../Images/TaskCategories/officeEvents.png")}
                style={{
                  height: height * 0.14,
                  width: height * 0.09, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('OfficeSpaceScreen', {mood: mood}) }}
            >
              <Image
                source={require("../Images/TaskCategories/officeSpace.png")}
                style={{
                  height: height * 0.14,
                  width: height * 0.085, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('InclusivityScreen', {mood: mood}) }}
            >
              <Image
                source={require("../Images/TaskCategories/inclusivity.png")}
                style={{
                  height: height * 0.115,
                  width: height * 0.15, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('FoodScreen', {mood: mood}) }}
            >
              <Image
                source={require("../Images/TaskCategories/food.png")}
                style={{
                  height: height * 0.11,
                  width: height * 0.072, justifyContent: 'center'
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[TasksStyles.categoryItem, { backgroundColor: accentColorMuted(mood) }]}
              onPress={() => { this.props.navigation.navigate('OtherScreen', {mood: mood}) }}
            >
              <Image
                source={require("../Images/TaskCategories/other.png")}
                style={{
                  height: height * 0.088,
                  width: height * 0.106, justifyContent: 'center'
                }} />
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
    fontSize: height * 0.025
  },
  task: {
    width: height * 0.422,
    height: height * 0.109,
    borderWidth: 1,
    borderRadius: height * 0.01,
    borderColor: '#BDBDBD'
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryItem: {
    alignItems: 'center',
    height: height * 0.2,
    width: height * 0.2,
    margin: height * 0.013,
    borderRadius: height * 0.012,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: height * 0.025,
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: 'Lato-Black'
  }
});
