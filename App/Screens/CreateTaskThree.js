import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import Home from '../Screens/HomeScreen';
import { StackActions, NavigationActions } from 'react-navigation';

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
        <View style={{ justifyContent: 'center', alignItems: 'center' }} />
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginTop: 2 / 817 * height,
            marginRight: 10 / 375 * width,
          }}
          onPress={() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'ThoughtsScreen' })],
            });
            navigation.dispatch(resetAction);
          }}
        >
          <Text style={{
            fontFamily: 'Lato-Regular',
            fontSize: 17 / 375 * width,
            alignSelf: 'center',
            color: '#007AFF',
          }}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
      }
    };
  };

  setbuttonSelected() {
    this.setState({ buttonPressedFood: true });
  }

  updateMood = () => {
    if (!this.props.navigation) {
      return;
    }
    this.setState({ mood: this.props.navigation.state.params.mood });
  }

  componentDidMount() {
    setInterval(() => (
      this.props.navigation.state.params.mood != accentColor(mood) ?
        this.updateMood() : ""
    ), 500);
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text style={{
          fontFamily: 'Lato-Bold',
          fontSize: height * 0.05,
          textAlign: 'left',
          marginTop: height * 0.01,
          marginBottom: height * 0.02,
          marginLeft: width * 0.053,
        }}>Create Task</Text>
        <Text style={{
          fontFamily: 'Lato-Italic',
          fontSize: 20 / 375 * width,
          textAlign: 'left',
          marginTop: 0,
          marginBottom: 20 / 817 * height,
          marginLeft: 20 / 375 * width,
        }}>Choose a category</Text>
        <View style={TasksStyles.categoryContainer}>
          <TouchableOpacity
            style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedOffsites ? accentColor(mood) : accentColorMuted(mood) }]}
            onPress={() => { }}
          >
            <Image
              source={require("../Images/TaskCategories/offsites.png")}
              style={{
                width: 69.42 / 375 * width,
                height: 70.99 / 817 * height,
                justifyContent: 'center'
              }}
              resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity
            style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedEvents ? accentColor(mood) : accentColorMuted(mood) }]}
            onPress={() => { }}
          >
            <Image
              source={require("../Images/TaskCategories/officeEvents.png")}
              style={{
                height: 85 / 817 * height,
                width: 56.86 / 375 * width, justifyContent: 'center'
              }}
              resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity
            style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedSpace ? accentColor(mood) : accentColorMuted(mood) }]}
            onPress={() => { }}
          >
            <Image
              source={require("../Images/TaskCategories/officeSpace.png")}
              style={{
                height: 90 / 817 * height,
                width: 54.65 / 375 * width, justifyContent: 'center'
              }}
              resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity
            style={[TasksStyles.categoryItem, { backgroundColor: this.state.buttonPressedInclusivity ? accentColor(mood) : accentColorMuted(mood) }]}
            onPress={() => { }}
          >
            <Image
              source={require("../Images/TaskCategories/inclusivity.png")}
              style={{
                height: 67 / 817 * height,
                width: 90.09 / 375 * width, justifyContent: 'center'
              }}
              resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity
            style={[TasksStyles.categoryItemBottom, { backgroundColor: this.state.buttonPressedFood ? accentColor(mood) : accentColorMuted(mood) }]}
            onPress={() => { this.setbuttonSelected() }}
          >
            <Image
              source={ this.state.buttonPressedFood ? require("../Images/TaskCategories/food-white.png") : require("../Images/TaskCategories/food.png")}
              style={{
                height: 65.14 / 817 * height,
                width: 42.83 / 375 * width, justifyContent: 'center'
              }}
              resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity
            style={[TasksStyles.categoryItemBottom, { backgroundColor: this.state.buttonPressedOther ? accentColor(mood) : accentColorMuted(mood) }]}
            onPress={() => { }}
          >
            <Image
              source={require("../Images/TaskCategories/other.png")}
              style={{
                height: 54 / 817 * height,
                width: 66 / 375 * width, justifyContent: 'center'
              }}
              resizeMode='contain'/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: accentColor(mood),
            opacity: 0.8,
            borderRadius: 7,
            width: (196 / 375) * width,
            height: (41 / 817) * height,
            alignSelf: 'center',
            marginTop: 45 / 817 * height,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => { if (this.state.buttonPressedFood) { this.props.navigation.navigate('TasksWeeklyLunches', { mood: mood }) } }}
        >
          <Text style={{
            fontFamily: 'Lato-Bold',
            fontSize: 20 / 375 * width,
            alignSelf: 'center',
            color: '#FFFFFF',
            textAlign: 'center',
          }}>CREATE</Text>
        </TouchableOpacity>
        <View style={TasksStyles.container}>
          <View style={TasksStyles.CircleShapeView}>
          </View>
          <View style={TasksStyles.CircleShapeView}>
          </View>
          <View style={{
            width: 9 / 375 * width,
            height: 9 / 375 * width,
            borderRadius: (9 / 375 * width) / 2,
            marginLeft: 20 / 375 * width,
            marginRight: 10 / 375 * width,
            opacity: 0.8,
            backgroundColor: accentColor(mood),
          }}>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const TasksStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30 / 375 * width
  },
  CircleShapeView: {
    width: 9 / 375 * width,
    height: 9 / 375 * width,
    borderRadius: (9 / 375 * width) / 2,
    backgroundColor: '#BDBDBD',
    marginLeft: 20 / 375 * width,
    marginRight: 10 / 375 * width,
  },
  displayText: {
    flex: 1,
    fontSize: 40 / 375 * width,
    fontStyle: 'italic',
    fontWeight: '200',
    color: 'black',
    padding: '15%',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Lato-Black',
    fontSize: 22 / 375 * width,
    textAlign: "center"
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 20 / 375 * width
  },
  task: {
    width: 345 / 375 * width,
    height: 89 / 817 * height,
    left: 15 / 375 * width,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#BDBDBD'
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageIndicator: {
    height: 20 / 817 * height,
    width: '20%',
    alignSelf: 'center',
    marginTop: 5 / 817 * height,
  },
  categoryItem: {
    alignItems: 'center',
    height: 112.98 / 375 * width,
    width: 112.98 / 375 * width,
    margin: 7,
    opacity: 0.8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  },
  categoryItemBottom: {
    alignItems: 'center',
    height: 112.98 / 375 * width,
    width: 112.98 / 375 * width,
    margin: 7 / 375 * width,
    marginBottom: 0,
    opacity: 0.8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  }
});
