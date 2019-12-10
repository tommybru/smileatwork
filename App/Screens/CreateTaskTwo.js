import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import Home from '../Screens/HomeScreen';
import CalendarPicker from 'react-native-calendar-picker';
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

  disableDates(date) {
    wanted_date = new Date(2019, 11, 19);
    format_wanted_date = wanted_date.getFullYear() + "-" + (wanted_date.getMonth() + 1) + "-" + wanted_date.getDate()
    format_curr_date = date.utc().format('YYYY-MM-DD');
    if (format_curr_date === format_wanted_date) {
      return false;
    } else {
      return true;
    }
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

  static navigationOptions = ({ navigation }) => {
    return {
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

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
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
          marginBottom: 60 / 817 * height,
          marginLeft: 20 / 375 * width,
        }}>Finish task by</Text>
        <CalendarPicker
          onDateChange={this.onDateChange}
          disabledDates={this.disableDates}
          selectedDayColor={accentColor(mood)}
          selectedDayTextColor='white'
        />
        <TouchableOpacity
          style={{
            backgroundColor: accentColor(mood),
            opacity: 0.8,
            borderRadius: 7,
            width: (196 / 375) * width,
            height: (41 / 817) * height,
            alignSelf: 'center',
            marginTop: 50 / 817 * height,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => { if (this.state.selectedStartDate) { this.props.navigation.navigate('CreateTaskThree', { mood: mood }) } }}
        >
          <Text style={{
            fontFamily: 'Lato-Bold',
            fontSize: 20 / 375 * width,
            alignSelf: 'center',
            color: '#FFFFFF',
            textAlign: 'center',
          }}>NEXT</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.CircleShapeView}>
          </View>
          <View style={{
            width: 9 / 375 * width,
            height: 9 / 375 * width,
            borderRadius: (9 / 375 * width) / 2,
            opacity: 0.8,
            marginLeft: 20 / 375 * width,
            marginRight: 10 / 375 * width,
            backgroundColor: accentColor(mood),
          }}>
          </View>
          <View style={styles.CircleShapeView}>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  pageIndicator: {
    height: 20 / 817 * height,
    width: '20%',
    alignSelf: 'center',
    marginTop: 40 / 817 * height,
  },
});
