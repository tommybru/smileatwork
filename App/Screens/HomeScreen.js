import React from 'react';
import { FlatList, StyleSheet, Text, ScrollView, View, TouchableOpacity, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { Metrics } from '../Themes';
import { Entypo } from '@expo/vector-icons';
import firestore from '../../firebase.js';
import firebase from 'firebase';
import { Overlay } from "react-native-elements";
import TaskImages from '../../App/Components/TaskImageCollection.js';
import OverlayMinority from '../Components/OverlayImageMinorityCollection.js';
import OverlayGraph from '../Components/OverlayImageGraphCollection.js';
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
    return '#E78B00'
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
      headerStyle: {
        backgroundColor: homeScreenBackgroundColor(navigation.getParam('mood')),
        borderBottomWidth: 0,
        height: 0,
      },
      headerTintColor: 'black',
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
    if (mood == undefined) {
      mood = "SAD";
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: homeScreenBackgroundColor(mood) }}>
        <View style={styles.faceimage}>
          <Text style={{ fontSize: height * 0.03, fontFamily: 'Lato-Regular', paddingTop: height * 0.0367 }}>Your team feels</Text>
          <Text style={{ fontSize: height * 0.05, fontFamily: 'Lato-Black', color: accentColor(mood) }}>{mood}</Text>
          <Text style={styles.checkintext}>Last team check-in a few seconds ago</Text>
          <Image
            source={FaceImages[mood]}
            style={{ marginTop: 50/817 * height, marginBottom: 20/817 * height, height: height * 0.2, width: height * 0.2 }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              opacity: 0.8,
              paddingTop: height * 0.025,
              borderRadius: 100,
              width: height * 0.2,
              height: height * 0.08,
              marginRight: height * 0.01,
            }}
            onPress={() => this.setMoodsOverlayVisible(true)}
          >
            <Text style={{
              fontFamily: 'Lato-Bold',
              fontSize: height * 0.023,
              textAlign: 'center'
            }}> MORE DATA </Text>
          </TouchableOpacity>
          <Overlay
            isVisible={this.state.moodsOverlayVisible}
            fullScreen={true}
            overlayStyle={[styles.moodsOverlay, { justifyContent: 'center' }]}
            animationType="slide"
            windowBackgroundColor="rgba(0, 0, 0, 0)"
            onBackdropPress={() => this.setMoodsOverlayVisible(false)}
          >
            <View style={{ flex: 1, marginHorizontal: 15 / 375 * width }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 / 817 * height }}>
                <Text style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: height * 0.04,
                }}>More Data</Text>

                <TouchableOpacity
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => this.setMoodsOverlayVisible(false)}>
                  <Text style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 17 / 375 * width,
                    alignSelf: 'center',
                    color: '#007AFF',
                  }}>Cancel</Text>
                </TouchableOpacity>
              </View>

              <Text style={{
                fontFamily: 'Lato-Regular',
                fontSize: height * 0.04,
                marginTop: 46 / 817 * height
              }}>People are also feeling</Text>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={OverlayMinority[mood]}
                  style={{ height: 112 / 817 * height, width: 303 / 375 * width, marginTop: 27 / 817 * height }}
                  resizeMode='contain'
                />
              </View>

              <Text style={{
                fontFamily: 'Lato-Regular',
                fontSize: height * 0.04,
                marginTop: 67 / 817 * height
              }}>Recent Moods</Text>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={OverlayGraph[mood]}
                  style={{ height: 296 / 817 * height, width: 318 / 375 * width, marginTop: 31 / 817 * height }}
                  resizeMode='contain'
                />
              </View>
            </View>
          </Overlay>

          <TouchableOpacity
            style={{
              backgroundColor: accentColor(mood),
              opacity: 0.8,
              paddingTop: height * 0.025,
              borderRadius: 100,
              width: height * 0.2,
              height: height * 0.08,
              marginLeft: height * 0.01,
            }}
            onPress={() => {
              this.props.navigation.navigate('ThoughtsScreen', { mood: mood });
            }}
          >
            <Text style={{
              fontFamily: 'Lato-Bold',
              fontSize: height * 0.023,
              textAlign: 'center',
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
              { key: '1', link: "TaskCreativeSpace" },
              { key: '2', link: "TaskMiami" },
              { key: '3', link: "TaskBday" }
            ]}
            renderItem={({ item }) => <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(item.link, { mood: mood });
              }}>
              <View style={{ backgroundColor: 'white', width: width * 0.95, height: height * 0.11, borderRadius: height * 0.01, marginBottom: height * 0.01, alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={TaskImages[item.key]}
                  style={styles.tasks}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
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
    margin: 25 / 375 * width,
    marginLeft: (height < 800 && height > 700) ? 45 / 375 * width : 25 / 375 * width,
    marginRight: (height < 800 && height > 700) ? 45 / 375 * width : 25 / 375 * width,
    marginBottom: 15 / 817 * height,
  },
  tasksColumn: {
    flex: 1,
    alignItems: "center",
  },
  faceimage: {
    alignItems: "center",
    justifyContent: 'center'
  },
  checkintext: {
    fontSize: height * 0.027,
    fontFamily: 'Lato-LightItalic',
  },
  taskstext: {
    fontSize: height * 0.03,
    padding: height * 0.02,
    paddingLeft: width * 0.032,
    fontFamily: 'Lato-Bold'
  },
  tasks: {
    width: width * 0.82,
    alignContent: "center"
  },
  headerText: {
    fontSize: width * 0.053,
    fontFamily: 'Lato-Bold',
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: height * -0.031
  }
});
