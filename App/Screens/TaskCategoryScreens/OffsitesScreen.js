import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { material } from 'react-native-typography';
import TaskMiami from '../../Screens/TaskMiami.js';

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

export default class OffsitesScreen extends React.Component {


    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Image source={require('../../Images/TaskCategoryIcons/offsiteIcon.png')}
                        style={{ height: 30, width: 42, marginRight: '8%' }} />
                    <Text style={OffsitesSyles.heading}>OFFSITES</Text>
                </View>
            ),
            headerStyle: {
                backgroundColor: homeScreenBackgroundColor(mood),
                borderBottomWidth: 0,
            }
        };
    };

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
            <View style={OffsitesSyles.tasksContainer}>
                <TouchableOpacity
                    style={[OffsitesSyles.task, { justifyContent: 'center', marginTop: 20 }]}
                    onPress={() => { this.props.navigation.navigate('TaskMiami', {mood: mood});}}
                >
                    <Text style={{ left: 24, fontFamily: 'Lato-Regular', fontSize: 23 }}>Miami Trip</Text>
                    <Text style={{ fontSize: 16, fontFamily: 'Lato-Italic', color: accentColor(mood), left: 22 }}>Expires in 1 day</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const OffsitesSyles = StyleSheet.create({
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
    tasksContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    task: {
        width: 345,
        height: 89,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#BDBDBD',
        margin: 5
    },
})
