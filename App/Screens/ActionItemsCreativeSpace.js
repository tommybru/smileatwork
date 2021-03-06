import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, ColorPropType, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import Home from '../Screens/HomeScreen';
import { Colors } from '../Themes';
var { height, width } = Dimensions.get('window');

;

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

export default class ActionItemsCreativeSpace extends React.Component {
  state = {
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    textValue1: "CLAIM",
    textValue2: "CLAIM",
    textValue3: "CLAIM",
    textValue4: "CLAIM",
    claim1: "",
    claim2: "",
    claim3: "",
    claim4: "",
    completedButton1: false,
    completedButton2: false,
    completedButton3: false,
    completedButton4: false,
    hasHitAddButton: false,
  }

  async componentDidMount() {
    this._isMounted = true;
    try {
      this.setState({ button1: ((await AsyncStorage.getItem('Creativebutton1') || false) === "true") });
      this.setState({ button2: ((await AsyncStorage.getItem('Creativebutton2') || false) === "true") });
      this.setState({ button3: ((await AsyncStorage.getItem('Creativebutton3') || false) === "true") });
      this.setState({ button4: ((await AsyncStorage.getItem('Creativebutton4') || false) === "true") });

      this.setState({ textValue1: (await AsyncStorage.getItem('CreativetextValue1') || 'CLAIM') });
      this.setState({ textValue2: (await AsyncStorage.getItem('CreativetextValue2') || 'CLAIM') });
      this.setState({ textValue3: (await AsyncStorage.getItem('CreativetextValue3') || 'CLAIM') });
      this.setState({ textValue4: (await AsyncStorage.getItem('CreativetextValue4') || 'CLAIM') });


      this.setState({ claim1: (await AsyncStorage.getItem('Creativeclaim1') || '') });
      this.setState({ claim2: (await AsyncStorage.getItem('Creativeclaim2') || '') });
      this.setState({ claim3: (await AsyncStorage.getItem('Creativeclaim3') || '') });
      this.setState({ claim4: (await AsyncStorage.getItem('Creativeclaim4') || '') });

      this.setState({ completedButton1: ((await AsyncStorage.getItem('CreativecompletedButton1') || false) === "true") });
      this.setState({ completedButton2: ((await AsyncStorage.getItem('CreativecompletedButton2') || false) === "true") });
      this.setState({ completedButton3: ((await AsyncStorage.getItem('CreativecompletedButton3') || false) === "true") });
      this.setState({ completedButton4: ((await AsyncStorage.getItem('CreativecompletedButton4') || false) === "true") });

      this.setState({ hasHitAddButton: ((await AsyncStorage.getItem('CreativehasHitAddButton') || false) === "true") });
    } catch (error) {
      // Error retrieving data
      console.log("Async storage error in retreival");
    }
    setInterval(() => (
      this.props.navigation.state.params.mood != accentColor(mood) ?
        this.updateMood() : ""
    ), 500);
  }

  async componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.colorTimer);
    try {
      await AsyncStorage.setItem('Creativebutton1', this.state.button1.toString());
      await AsyncStorage.setItem('Creativebutton2', this.state.button2.toString());
      await AsyncStorage.setItem('Creativebutton3', this.state.button3.toString());
      await AsyncStorage.setItem('Creativebutton4', this.state.button4.toString());

      await AsyncStorage.setItem('CreativetextValue1', this.state.textValue1);
      await AsyncStorage.setItem('CreativetextValue2', this.state.textValue2);
      await AsyncStorage.setItem('CreativetextValue3', this.state.textValue3);
      await AsyncStorage.setItem('CreativetextValue4', this.state.textValue4);

      await AsyncStorage.setItem('Creativeclaim1', this.state.claim1);
      await AsyncStorage.setItem('Creativeclaim2', this.state.claim2);
      await AsyncStorage.setItem('Creativeclaim3', this.state.claim3);
      await AsyncStorage.setItem('Creativeclaim4', this.state.claim4);

      await AsyncStorage.setItem('CreativecompletedButton1', this.state.completedButton1.toString());
      await AsyncStorage.setItem('CreativecompletedButton2', this.state.completedButton2.toString());
      await AsyncStorage.setItem('CreativecompletedButton3', this.state.completedButton3.toString());
      await AsyncStorage.setItem('CreativecompletedButton4', this.state.completedButton4.toString());
      await AsyncStorage.setItem('CreativehasHitAddButton', this.state.hasHitAddButton.toString());
    } catch (error) {
      // Error saving data
      console.warn("async storage had a problem storying the data on unmount");
    }
  }


  getClaimStatus(type) {
    if (this.state[type] === true) {
      return ["UNCLAIM", "Claimed By : You"];
    } else {
      return ["CLAIM", ""];
    }
  }

  updateCreateNewTask(hasHitCreateNewTask) {
    this.setState({ hasHitAddButton: true });
  }
  updateChoice(type) {
    switch (type) {
      case "button1":
        this.setState({ button1: !this.state.button1 }, function () {
          claimStatus = this.getClaimStatus(type);
          this.setState({ textValue1: claimStatus[0] });
          this.setState({ claim1: claimStatus[1] });
        });
        break;
      case "button2":
        this.setState({ button2: !this.state.button2 }, function () {
          claimStatus = this.getClaimStatus(type);
          this.setState({ textValue2: claimStatus[0] });
          this.setState({ claim2: claimStatus[1] });
        });
        break;
      case "button3":
        this.setState({ button3: !this.state.button3 }, function () {
          claimStatus = this.getClaimStatus(type);
          this.setState({ textValue3: claimStatus[0] });
          this.setState({ claim3: claimStatus[1] });
        });
        break;
      case "button4":
        this.setState({ button4: !this.state.button4 }, function () {
          claimStatus = this.getClaimStatus(type);
          this.setState({ textValue4: claimStatus[0] });
          this.setState({ claim4: claimStatus[1] });
        });
        break;
      default:
        break;
    }
  }

  updateItemCompletionStatus(type) {
    switch (type) {
      case "completedButton1":
        if (!this.state.button1) {
          return;
        }
        this.setState({ completedButton1: !this.state[type] });
        break;
      case "completedButton2":
        if (!this.state.button2) {
          return;
        }
        this.setState({ completedButton2: !this.state[type] });
        break;
      case "completedButton3":
        if (!this.state.button3) {
          return;
        }
        this.setState({ completedButton3: !this.state[type] });
        break;
      case "completedButton4":
        if (!this.state.button4) {
          return;
        }
        this.setState({ completedButton4: !this.state[type] });
        break;
      default:
        break;
    }
  }


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={TaskStyle.heading}>Action Items</Text>
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

  renderNewActionItem() {
    if (this.state.showCancel) {
      return (
        <TouchableHighlight
          onPress={this.toggleCancel()}>
          <View>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  }



  render() {
    return (
      <View style={{ borderColor: '#DADADA', borderWidth: 1, marginTop: 20/817 * height, marginLeft: 20/375 * width, marginRight: 20/375 * width, flex: 1, marginBottom: 20/817 * height, borderRadius: 15 }}>
        <View style={{ flexDirection: 'column' }}>

          <View style={{ flexDirection: 'column', height: "auto", width: 301/375 * width, borderBottomWidth: 1, borderColor: '#DADADA', alignSelf: "center" }}>
            <View style={{ flexDirection: 'row', paddingTop: 15/817 * height }}>
              <TouchableOpacity
                style={{
                  borderColor: this.state.completedButton1 ? accentColor(mood) : 'black',
                  backgroundColor: this.state.completedButton1 ? accentColor(mood) : 'white',
                  paddingTop: 18/817 * height,
                  opacity: 0.7,
                  borderRadius: (23/375 * width)/2,
                  width: 23/375 * width,
                  height: 23/375 * width,
                  borderWidth: 1,
                }}
                onPress={() => {
                  this.updateItemCompletionStatus("completedButton1");
                }}
              >
              </TouchableOpacity>
              <Text style={{
                fontSize: 20/375 * width,
                fontFamily: 'Lato-Regular',
                paddingLeft: 10/375 * width,
                textDecorationLine: this.state.completedButton1 ? 'line-through' : 'none'
              }}>Redesign name tags</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginLeft: 33/375 * width, paddingTop: 5/817 * height }}>
                <Text style={{ color: accentColor(mood), fontSize: 15/375 * width, fontFamily: "Lato-Italic" }}>{this.state.claim1}</Text>
                </View>
              <View style={{ opacity: this.state.completedButton1 ? 0.0 : 1, marginLeft: "auto" }}>
                <TouchableOpacity
                  style={{
                    borderColor: accentColor(mood),
                    backgroundColor: this.state.button1 ? 'white' : accentColor(mood),
                    opacity: 0.7,
                    borderRadius: 11.5,
                    justifyContent: "space-evenly",
                    width: 95/375 * width,
                    height: 25/817 * height,
                    borderWidth: 1,
                    marginLeft: 'auto',
                    marginRight: 20/375 * width,
                    marginTop: 5/817 * height,
                    marginBottom: 10/817 * height
                  }}
                  onPress={() => {
                    this.updateChoice('button1');
                    // selected={this.state.button3}
                  }} >
                  <Text style={{
                    color: this.state.button1 ? accentColor(mood) : 'white',
                    fontSize: 13/375 * width,
                    textAlign: 'center',
                    fontFamily: 'Lato-Regular',
                  }}>{this.state.textValue1}</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>

          <View style={{ flexDirection: 'column', height: "auto", width: 301/375 * width, borderBottomWidth: 1, borderColor: '#DADADA', alignSelf: "center" }}>
            <View style={{ flexDirection: 'row', paddingTop: 10/817 * height }}>
              <TouchableOpacity
                style={{
                  borderColor: this.state.completedButton2 ? accentColor(mood) : 'black',
                  backgroundColor: this.state.completedButton2 ? accentColor(mood) : 'white',
                  paddingTop: 18/817 * height,
                  opacity: 0.7,
                  borderRadius: (23/375 * width)/2,
                  width: 23/375 * width,
                  height: 23/375 * width,
                  borderWidth: 1,
                }}
                onPress={() => {
                  this.updateItemCompletionStatus("completedButton2");
                }}
              >
              </TouchableOpacity>
              <Text style={{
                fontSize: 20/375 * width,
                fontFamily: 'Lato-Regular',
                paddingLeft: 10/375 * width,
                textDecorationLine: this.state.completedButton2 ? 'line-through' : 'none'
              }}>Bring artwork for the walls</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginLeft: 33/375 * width, paddingTop: 5/817 * height }}>
                <Text style={{ color: accentColor(mood), fontSize: 15/375 * width, fontFamily: "Lato-Italic" }}>{this.state.claim2}</Text>
                </View>
              <View style={{ opacity: this.state.completedButton2 ? 0.0 : 1, marginLeft: "auto" }}>
                <TouchableOpacity
                  style={{
                    borderColor: accentColor(mood),
                    backgroundColor: this.state.button2 ? 'white' : accentColor(mood),
                    opacity: 0.7,
                    borderRadius: 11.5,
                    justifyContent: "space-evenly",
                    width: 95/375 * width,
                    height: 25/817 * height,
                    borderWidth: 1,
                    marginLeft: 'auto',
                    marginRight: 20/375 * width,
                    marginTop: 5/817 * height,
                    marginBottom: 10/817 * height
                  }}
                  onPress={() => {
                    this.updateChoice('button2');
                    // selected={this.state.button3}
                  }} >
                  <Text style={{
                    color: this.state.button2 ? accentColor(mood) : 'white',
                    fontSize: 13/375 * width,
                    textAlign: 'center',
                    fontFamily: 'Lato-Regular',
                  }}>{this.state.textValue2}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', height: "auto", width: 301/375 * width, borderBottomWidth: 1, borderColor: '#DADADA', alignSelf: "center" }}>
            <View style={{ flexDirection: 'row', paddingTop: 10/817 * height }}>

              <TouchableOpacity
                style={{
                  borderColor: this.state.completedButton3 ? accentColor(mood) : 'black',
                  backgroundColor: this.state.completedButton3 ? accentColor(mood) : '#FFFFFF',
                  paddingTop: 18/817 * height,
                  opacity: 0.7,
                  borderRadius: (23/375 * width)/2,
                  width: 23/375 * width,
                  height: 23/375 * width,
                  borderWidth: 1,
                }}
                onPress={() => {
                  this.updateItemCompletionStatus("completedButton3");
                }}
              >
              </TouchableOpacity>
              <Text style={{
                fontSize: 20/375 * width,
                fontFamily: 'Lato-Regular',
                paddingLeft: 10/375 * width,
                textDecorationLine: this.state.completedButton3 ? 'line-through' : 'none'
              }}>Bean. Bag. Chairs.</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginLeft: 33/375 * width, paddingTop: 5/817 * height }}>
                <Text style={{ color: accentColor(mood), fontSize: 15/375 * width, fontFamily: "Lato-Italic" }}>{this.state.claim3}</Text>
              </View>
              <View style={{ opacity: this.state.completedButton3 ? 0.0 : 1, marginLeft: "auto" }}>
                <TouchableOpacity
                  style={{
                    borderColor: accentColor(mood),
                    backgroundColor: this.state.button3 ? 'white' : accentColor(mood),
                    opacity: 0.7,
                    borderRadius: 11.5,
                    justifyContent: "space-evenly",
                    width: 95/375 * width,
                    height: 25/817 * height,
                    borderWidth: 1,
                    marginLeft: 'auto',
                    marginRight: 20/375 * width,
                    marginTop: 5/817 * height,
                    marginBottom: 10/817 * height
                  }}
                  onPress={() => {
                    this.updateChoice('button3');
                    // selected={this.state.button3}
                  }} >
                  <Text style={{
                    color: this.state.button3 ? accentColor(mood) : 'white',
                    fontSize: 13/375 * width,
                    textAlign: 'center',
                    fontFamily: 'Lato-Regular',
                  }}>{this.state.textValue3}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>


          <View style={{ flexDirection: 'column', height: "auto", width: 301/375 * width, borderBottomWidth: 1, borderColor: '#DADADA', alignSelf: "center" }}>
            <View style={{ flexDirection: 'row', paddingTop: 10/817 * height }}>
              <TouchableOpacity
                style={{
                  borderColor: accentColor(mood),
                  backgroundColor: accentColor(mood),
                  opacity: 0.7,
                  borderRadius: (23/375 * width)/2,
                  width: 23/375 * width,
                  height: 23/375 * width,
                  borderWidth: 1,
                }}
                onPress={() => {
                  //this.updateItemCompletionStatus("completedButton2");
                }}
              >
              </TouchableOpacity>
              <Text style={{
                fontSize: 20/375 * width,
                fontFamily: 'Lato-Regular',
                paddingLeft: 10/375 * width,
                textDecorationLine: "line-through",
              }}>Add some green plants</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginLeft: 33/375 * width, marginBottom: 10/817 * height }}>
                <Text style={{ color: accentColor(mood), fontSize: 15/375 * width, fontFamily: "Lato-Italic" }}>Claimed by: Sunny</Text>
                </View>
            </View>
          </View>


          <View style={{ flexDirection: 'column', height: "auto", width: 301/375 * width, borderBottomWidth: 1, borderColor: '#DADADA', alignSelf: "center" }}>
            <View style={{ flexDirection: 'row', paddingTop: 10/817 * height }}>
              <TouchableOpacity
                style={{
                  borderColor: 'black',
                  backgroundColor: "white",
                  opacity: 0.7,
                  borderRadius: (23/375 * width)/2,
                  width: 23/375 * width,
                  height: 23/375 * width,
                  borderWidth: 1,
                }}
                onPress={() => {
                  //this.updateItemCompletionStatus("completedButton2");
                }}
              >
              </TouchableOpacity>
              <Text style={{
                fontSize: 20/375 * width,
                fontFamily: 'Lato-Regular',
                paddingLeft: 10/375 * width,
              }}>Get a sofa</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginLeft: 33/375 * width, marginBottom: 10/817 * height }}>
                <Text style={{ color: accentColor(mood), fontSize: 15/375 * width, fontFamily: "Lato-Italic" }}>Claimed by: Misbah</Text>
                </View>
            </View>
          </View>


          <View style={{ flexDirection: 'column', height: "auto", width: 301/375 * width, borderBottomWidth: 1, borderColor: '#DADADA', alignSelf: "center", opacity: this.state.hasHitAddButton ? 1 : 0 }}>
            <View style={{ flexDirection: 'row', paddingTop: 10/817 * height }}>

              <TouchableOpacity
                style={{
                  borderColor: this.state.completedButton4 ? accentColor(mood) : 'black',
                  backgroundColor: this.state.completedButton4 ? accentColor(mood) : '#FFFFFF',
                  paddingTop: 18/817 * height,
                  opacity: 0.7,
                  borderRadius: (23/375 * width)/2,
                  width: 23/375 * width,
                  height: 23/375 * width,
                  borderWidth: 1,
                }}
                onPress={() => {
                  this.updateItemCompletionStatus("completedButton4");
                }}
              >
              </TouchableOpacity>
              <Text style={{
                fontSize: 20/375 * width,
                fontFamily: 'Lato-Regular',
                paddingLeft: 10/375 * width,
                textDecorationLine: this.state.completedButton4 ? 'line-through' : 'none'
              }}>Put up team photos.</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginLeft: 33/375 * width, paddingTop: 5/817 * height }}>
                <Text style={{ color: accentColor(mood), fontSize: 15/375 * width, fontFamily: "Lato-Italic" }}>{this.state.claim4}</Text>
                </View>
              <View style={{ opacity: this.state.completedButton4 ? 0.0 : 1, marginLeft: "auto" }}>
                <TouchableOpacity
                  style={{
                    borderColor: accentColor(mood),
                    backgroundColor: this.state.button4 ? 'white' : accentColor(mood),
                    opacity: 0.7,
                    borderRadius: 11.5,
                    justifyContent: "space-evenly",
                    width: 95/375 * width,
                    height: 25/817 * height,
                    borderWidth: 1,
                    marginLeft: 'auto',
                    marginRight: 20/375 * width,
                    marginTop: 5/817 * height,
                    marginBottom: 10/817 * height
                  }}
                  onPress={() => {
                    this.updateChoice('button4');
                  }} >
                  <Text style={{
                    color: this.state.button4 ? accentColor(mood) : 'white',
                    fontSize: 13/375 * width,
                    textAlign: 'center',
                    fontFamily: 'Lato-Regular',
                  }}>{this.state.textValue4}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: "flex-end", marginBottom: 10/817 * height, marginTop: "auto", marginRight: 20/375 * width }}>
          <View style={{ justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                borderColor: accentColor(mood),
                backgroundColor: '#FFFFFF',
                alignSelf: "center",
                opacity: 0.7,
                borderRadius: (45/375 * width)/2,
                width: 45/375 * width,
                height: 45/375 * width,
                borderWidth: 1,
                justifyContent: "center",
                shadowColor: 'rgba(0,0,0, .4)', // IOS
                shadowOffset: { height: 1, width: 1 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 2, //IOS
                elevation: 2
              }}
              onPress={() => {
                this.updateCreateNewTask(true);
                // selected={this.state.button3}
              }}>
              <Text style={{
                fontSize: 35/375 * width,
                textAlign: 'center',
                fontFamily: 'Lato-Bold',
                color: accentColor(mood)
              }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }
}

const TaskStyle = StyleSheet.create({
  heading: {
    fontFamily: 'Lato-Black',
    fontSize: height * 0.035,
    textAlign: "center"
  },
});
