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



export default class InclusivityScreen extends React.Component {


    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={require('../../Images/TaskCategoryIcons/inclusivityIcon.png')}
                        style={{ height: height * 0.0367, width: width * 0.065, marginRight: '8%' }}
                        resizeMode='contain'/>
                    <Text style={InclusivityStyles.heading}>INCLUSIVITY</Text>
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
      if(!this.props.navigation) {
        return;
      }
      this.setState({mood: this.props.navigation.state.params.mood});
    }

    componentDidMount(){
      this.colorTimer = setInterval(() => (
        this.props.navigation.state.params.mood != backgroundColor(mood) ?
        this.updateMood() : ""
      ), 500);
    }

    componentWillUnmount() {
      clearInterval(this.colorTimer);
    }

    render() {
        return (
            <Text style={InclusivityStyles.displayText}>No tasks under this cateogry.</Text>
        );
    }
}

const InclusivityStyles = StyleSheet.create({
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
