import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

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

export default class OtherScreen extends React.Component {


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Image source={require('../../Images/TaskCategoryIcons/otherIcon.png')}
            style={{ height: height * 0.01, width: width * 0.1, marginRight: '8%' }}
            resizeMode='contain' />
          <Text style={OtherStyles.heading}>OTHER</Text>
        </View>
      ),
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: backgroundColor(mood),
        borderBottomWidth: 0,
        height: height * 0.07,
      }
    };
  };

  updateMood = () => {
    if (!this.props.navigation) {
      return;
    }
    this.setState({ mood: this.props.navigation.state.params.mood });
  }

    componentDidMount(){
      this.colorTimer = setInterval(() => (
        this.props.navigation.state.params.mood != accentColor(mood) ?
        this.updateMood() : ""
    ), 500);
  }

    componentWillUnmount() {
      clearInterval(this.colorTimer);
    }


  render() {
    return (
      <Text style={OtherStyles.displayText}>No tasks under this cateogry.</Text>
    );
  }
}

const OtherStyles = StyleSheet.create({
  displayText: {
    flex: 1,
    fontSize: width * 0.08,
    fontFamily: 'Lato-Regular',
    color: 'black',
    padding: '12%',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Lato-Black',
    fontSize: height * 0.03,
    textAlign: "center"
  },
})
