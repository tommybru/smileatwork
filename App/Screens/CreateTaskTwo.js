import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { material } from 'react-native-typography';
import Home from '../Screens/HomeScreen';
import CalendarPicker from 'react-native-calendar-picker';

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
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
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

  static navigationOptions = ({ navigation }) => {
    return {
      // headerTitle: (
      //   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      //   </View>
      // ),
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
      }
    };
  };

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
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
        }}>Finish task by</Text>
        <CalendarPicker
          onDateChange={this.onDateChange}
          selectedDayColor={accentColorMuted(mood)}
        />
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
          }}
          onPress={() => {this.props.navigation.navigate('CreateTaskThree', {mood: mood})}}
        >
          <Text style={{
            fontFamily:'Lato-Bold',
            fontSize: 20,
            alignSelf: 'center',
            color: '#FFFFFF',
          }}>NEXT</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.CircleShapeView}>
          </View>
          <View style={{
            width: 12,
            height: 12,
            borderRadius: 12/2,
            opacity: 0.8,
            marginLeft: 20,
            marginRight: 10,
            backgroundColor: accentColor(mood),
          }}>
          </View>
          <View style={styles.CircleShapeView}>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  taskTitle: {
    height: 200,
    width: width * 0.95,
    padding: 0,
    margin: 0,
    marginLeft: 10,
  },
  pageIndicator: {
    height: 20,
    width: '20%',
    alignSelf: 'center',
    marginTop: 40,
  },
  taskDes: {
    height: 250,
    width: width * 0.95,
    padding: 0,
    margin: 0,
    marginLeft: 10,
  },
});
