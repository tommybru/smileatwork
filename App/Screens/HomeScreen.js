import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics } from '../Themes';
import { Entypo } from '@expo/vector-icons';
import firestore from '../../firebase.js';
import firebase from 'firebase';
import { Overlay } from "react-native-elements";
import TaskImages from '../../App/Components/TaskImageCollection.js';
import OverlayImages from '../../App/Components/OverlayImageCollection.js';
import FaceImages from '../../App/Components/FaceImageCollection.js';

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
    return '#E7A600'
  } else if (mood == 'BORED') {
    return '#DD5D00'
  } else if (mood == 'STRESSED') {
    return '#167904'
  } else {
    return '#003498'
  }
}


export default class HomeScreen extends React.Component {

  state = {
    moodsOverlayVisible: false,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={styles.headerText}>Your team feels</Text>
      ),
      headerStyle: {
        backgroundColor: homeScreenBackgroundColor(navigation.getParam('mood')),
        borderBottomWidth: 0,
        height: height * 0.04,
      },
      headerTitleStyle: {
        flex: 1,
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: "auto"
      },
    };
  };

  setMoodsOverlayVisible(visible) {
    this.setState({ moodsOverlayVisible: visible });
  }

  render() {
    const { navigation } = this.props;
    mood = navigation.getParam('mood');
    if(mood == undefined) {
      mood = "SAD";
    }
    return (
      <View style={{ flex: 1, backgroundColor: homeScreenBackgroundColor(mood) }}>
        <View style={styles.faceimage}>
          <Text style={{ fontSize: height * 0.05, fontFamily: 'Lato-Black', color: accentColor(mood) }}>{mood}</Text>
          <Text style={styles.checkintext}> Last team check-in a few seconds ago</Text>
          <Image
            source={FaceImages[mood]}
            style={{ marginTop: 50, marginBottom: 20, height: height * 0.2, width: height * 0.2}}
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              opacity: 0.8,
              paddingTop: height * 0.028,
              borderRadius: 100,
              width: height * 0.2,
              height: height * 0.08,
              marginRight: height * 0.01,
            }}
            onPress={() => this.setMoodsOverlayVisible(true)}
          >
            <Text style={{
              fontFamily:'Lato-Bold',
              fontSize: height * 0.02,
              textAlign: 'center'
            }}> MORE DATA </Text>
          </TouchableOpacity>
          <Overlay
            isVisible={this.state.moodsOverlayVisible}
            fullScreen={true}
            overlayStyle={styles.moodsOverlay}
            animationType="slide"
            windowBackgroundColor="rgba(0, 0, 0, 0)"
            onBackdropPress={() => this.setMoodsOverlayVisible(false)}
          >
            <TouchableOpacity
            onPress={() => this.setMoodsOverlayVisible(false)}>
              <Image
                source={OverlayImages[mood]}
                style={{ width: width, height: height * 0.95}}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </Overlay>
          <TouchableOpacity
          style={{
            backgroundColor: accentColor(mood),
            opacity: 0.9,
            paddingTop: height * 0.028,
            borderRadius: 100,
            width: height * 0.2,
            height: height * 0.08,
            marginLeft: height * 0.01,
          }}
            onPress={() => {
              this.props.navigation.navigate('ThoughtsScreen', {mood: mood});
            }}
          >
            <Text style={{
              fontFamily:'Lato-Bold',
              fontSize: height * 0.02,
              alignSelf: 'center',
              color: '#FFFFFF'
            }}> WHY? </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.taskstext}>Tasks Expiring Soon</Text>
        </View>
        <View style={styles.tasksColumn}>
         <FlatList
         data={[
            {key: '1', link: "TaskCreativeSpace"},
            {key: '2', link: "TaskMiami"},
            {key: '3', link: "TaskBday"}
          ]}
         renderItem={({item}) => <TouchableOpacity
           onPress={() => {
             this.props.navigation.navigate(item.link, {mood: mood});
           }}>
           <View style={{backgroundColor: 'white', width: width * 0.95, height: height * 0.1, borderRadius: 15, marginBottom: height * 0.01, alignItems: "center", justifyContent: "center"}}>
             <Image
               source={TaskImages[item.key]}
               style={styles.tasks}
               resizeMode="contain"
             />
           </View>
         </TouchableOpacity>}
         keyExtractor={ (item, index) => index.toString()}
         />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: homeScreenBackgroundColor(),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 25,
    marginLeft: (height<800 && height>700) ? 45 : 25,
    marginRight: (height<800 && height>700)? 45 : 25,
    marginBottom: 15,
  },
  tasksColumn: {
    flex: 1,
    alignItems: "center",
  },
  faceimage: {
    alignItems: "center",
  },
  emotiontext: {
    fontSize: 34,
    fontWeight: '800',
    color: accentColor(),
  },
  checkintext: {
    fontSize: height * 0.024,
    fontFamily: 'Lato-Italic',
    fontWeight: '200',
    color: 'black',
  },
  taskstext: {
    fontSize: height * 0.03,
    padding: height * 0.02,
  },
  tasks: {
    width:width * 0.82,
    alignSelf: "center"
  },
  displayText: {
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: '200',
    color: 'black',
  },
  headerText: {
    fontSize: height * 0.03,
    fontFamily: 'Lato-Regular',
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto"
  }
});
