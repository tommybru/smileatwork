import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

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

export default class InclusivityScreen extends React.Component {


    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={require('../../Images/TaskCategoryIcons/inclusivityIcon.png')}
                        style={{ height: 30, width: 24.53, marginRight: '8%' }} />
                    <Text style={InclusivityStyles.heading}>INCLUSIVITY</Text>
                </View>
            ),
            headerStyle: {
                backgroundColor: homeScreenBackgroundColor(mood),
                borderBottomWidth: 0,
            }
        };
    };



    render() {
        return (
            <Text style={InclusivityStyles.displayText}>No tasks under this cateogry.</Text>
        );
    }
}

const InclusivityStyles = StyleSheet.create({
    displayText: {
        flex: 1,
        fontSize: 30,
        fontFamily: 'Lato-Regular',
        color: 'black',
        padding: '12%',
        justifyContent: 'center',
    },
    heading: {
        fontFamily: 'Lato-Black',
        fontSize: 22,
        textAlign: "center"
    },
})
