import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, ColorPropType } from 'react-native';
import { material } from 'react-native-typography';
// import Feed from '../Components/Feed';
import { AsyncStorage } from 'react-native';
import Home from '../Screens/HomeScreen';
import { Colors } from '../Themes';
var { height, width } = Dimensions.get('window');

;

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

export default class ActionItemsHoliday extends React.Component {
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
            this.setState({ button1: ((await AsyncStorage.getItem('Holidaybutton1') || false) === "true") });
            this.setState({ button2: ((await AsyncStorage.getItem('Holidaybutton2') || false) === "true") });
            this.setState({ button3: ((await AsyncStorage.getItem('Holidaybutton3') || false) === "true") });
            this.setState({ button4: ((await AsyncStorage.getItem('Holidaybutton4') || false) === "true") });

            this.setState({ textValue1: (await AsyncStorage.getItem('HolidaytextValue1') || 'CLAIM') });
            this.setState({ textValue2: (await AsyncStorage.getItem('HolidaytextValue2') || 'CLAIM') });
            this.setState({ textValue3: (await AsyncStorage.getItem('HolidaytextValue3') || 'CLAIM') });
            this.setState({ textValue4: (await AsyncStorage.getItem('HolidaytextValue4') || 'CLAIM') });


            this.setState({ claim1: (await AsyncStorage.getItem('Holidayclaim1') || '') });
            this.setState({ claim2: (await AsyncStorage.getItem('Holidayclaim2') || '') });
            this.setState({ claim3: (await AsyncStorage.getItem('Holidayclaim3') || '') });
            this.setState({ claim4: (await AsyncStorage.getItem('Holidayclaim4') || '') });

            this.setState({ completedButton1: ((await AsyncStorage.getItem('HolidaycompletedButton1') || false) === "true") });
            this.setState({ completedButton2: ((await AsyncStorage.getItem('HolidaycompletedButton2') || false) === "true") });
            this.setState({ completedButton3: ((await AsyncStorage.getItem('HolidaycompletedButton3') || false) === "true") });
            this.setState({ completedButton4: ((await AsyncStorage.getItem('HolidaycompletedButton4') || false) === "true") });

            this.setState({ hasHitAddButton: ((await AsyncStorage.getItem('HolidayhasHitAddButton') || false) === "true") });
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
        try {
            console.log("saving bros");
            await AsyncStorage.setItem('Holidaybutton1', this.state.button1.toString());
            await AsyncStorage.setItem('Holidaybutton2', this.state.button2.toString());
            await AsyncStorage.setItem('Holidaybutton3', this.state.button3.toString());
            await AsyncStorage.setItem('Holidaybutton4', this.state.button4.toString());

            await AsyncStorage.setItem('HolidaytextValue1', this.state.textValue1);
            await AsyncStorage.setItem('HolidaytextValue2', this.state.textValue2);
            await AsyncStorage.setItem('HolidaytextValue3', this.state.textValue3);
            await AsyncStorage.setItem('HolidaytextValue4', this.state.textValue4);

            await AsyncStorage.setItem('Holidayclaim1', this.state.claim1);
            await AsyncStorage.setItem('Holidayclaim2', this.state.claim2);
            await AsyncStorage.setItem('Holidayclaim3', this.state.claim3);
            await AsyncStorage.setItem('Holidayclaim4', this.state.claim4);

            await AsyncStorage.setItem('HolidaycompletedButton1', this.state.completedButton1.toString());
            await AsyncStorage.setItem('HolidaycompletedButton2', this.state.completedButton2.toString());
            await AsyncStorage.setItem('HolidaycompletedButton3', this.state.completedButton3.toString());
            await AsyncStorage.setItem('HolidaycompletedButton4', this.state.completedButton4.toString());
            await AsyncStorage.setItem('HolidayhasHitAddButton', this.state.hasHitAddButton.toString());
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
        console.log(type);
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
        console.log("toggle3");
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
            <View style={{ borderColor: '#DADADA', borderWidth: 1, marginTop: 20, marginLeft: 20, marginRight: 20, flex: 1, marginBottom: 20, borderRadius: 15 }}>
                <View style={{ flexDirection: 'column' }}>

                    <View style={{ flexDirection: 'column', height: 97, width: 301, borderBottomWidth: 1, borderColor: 'black', alignSelf: "center" }}>
                        <View style={{ flexDirection: 'row', paddingTop: 34.5 }}>
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    backgroundColor: this.state.completedButton1 ? accentColor(mood) : 'white',
                                    paddingTop: 18,
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    width: 23,
                                    height: 23,
                                    borderWidth: 1,
                                }}
                                onPress={() => {
                                    this.updateItemCompletionStatus("completedButton1");
                                }}
                            >
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'Lato-Regular',
                                paddingLeft: 10,
                                lineHeight: 24,
                                textDecorationLine: this.state.completedButton1 ? 'line-through' : 'none'
                            }}>Deck the halls</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginLeft: 33, paddingTop: 5 }}><Text style={{ color: accentColor(mood), fontSize: 15, fontFamily: "Lato-Italic" }}>{this.state.claim1}</Text></View>
                            <TouchableOpacity
                                style={{
                                    borderColor: accentColor(mood),
                                    backgroundColor: this.state.button1 ? 'white' : accentColor(mood),
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    justifyContent: "space-evenly",
                                    width: 95,
                                    height: 25,
                                    borderWidth: 1,
                                    marginLeft: 'auto',
                                    marginRight: 20,
                                    marginTop: 5,
                                }}
                                onPress={() => {
                                    console.log("hey");
                                    this.updateChoice('button1');
                                    console.log("hey");
                                    // selected={this.state.button3}
                                }} >
                                <Text style={{
                                    color: this.state.button1 ? accentColor(mood) : 'white',
                                    fontSize: 13,
                                    textAlign: 'center',
                                    fontFamily: 'Lato-Regular',
                                }}>{this.state.textValue1}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', height: 97, width: 301, borderBottomWidth: 1, borderColor: 'black', alignSelf: "center" }}>
                        <View style={{ flexDirection: 'row', paddingTop: 34.5 }}>
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    backgroundColor: this.state.completedButton2 ? accentColor(mood) : 'white',
                                    paddingTop: 18,
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    width: 23,
                                    height: 23,
                                    borderWidth: 1,
                                }}
                                onPress={() => {
                                    this.updateItemCompletionStatus("completedButton2");
                                }}
                            >
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'Lato-Regular',
                                paddingLeft: 10,
                                lineHeight: 24,
                                textDecorationLine: this.state.completedButton2 ? 'line-through' : 'none'
                            }}>Let it snow</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginLeft: 33, paddingTop: 5 }}><Text style={{ color: accentColor(mood), fontSize: 15, fontFamily: "Lato-Italic" }}>{this.state.claim2}</Text></View>
                            <TouchableOpacity
                                style={{
                                    borderColor: accentColor(mood),
                                    backgroundColor: this.state.button2 ? 'white' : accentColor(mood),
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    justifyContent: "space-evenly",
                                    width: 95,
                                    height: 25,
                                    borderWidth: 1,
                                    marginLeft: 'auto',
                                    marginRight: 20,
                                    marginTop: 5,
                                }}
                                onPress={() => {
                                    console.log("hey");
                                    this.updateChoice('button2');
                                    console.log("hey");
                                    // selected={this.state.button3}
                                }} >
                                <Text style={{
                                    color: this.state.button2 ? accentColor(mood) : 'white',
                                    fontSize: 13,
                                    textAlign: 'center',
                                    fontFamily: 'Lato-Regular',
                                }}>{this.state.textValue2}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', height: 97, width: 301, borderBottomWidth: 1, borderColor: 'black', alignSelf: "center" }}>
                        <View style={{ flexDirection: 'row', paddingTop: 34.5 }}>

                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    backgroundColor: this.state.completedButton3 ? accentColor(mood) : '#FFFFFF',
                                    paddingTop: 18,
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    width: 23,
                                    height: 23,
                                    borderWidth: 1,
                                }}
                                onPress={() => {
                                    this.updateItemCompletionStatus("completedButton3");
                                }}
                            >
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'Lato-Regular',
                                paddingLeft: 10,
                                lineHeight: 24,
                                textDecorationLine: this.state.completedButton3 ? 'line-through' : 'none'
                            }}>Bring in a Snowman!</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginLeft: 33, paddingTop: 5 }}><Text style={{ color: accentColor(mood), fontSize: 15, fontFamily: "Lato-Italic" }}>{this.state.claim3}</Text></View>
                            <TouchableOpacity
                                style={{
                                    borderColor: accentColor(mood),
                                    backgroundColor: this.state.button3 ? 'white' : accentColor(mood),
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    justifyContent: "space-evenly",
                                    width: 95,
                                    height: 25,
                                    borderWidth: 1,
                                    marginLeft: 'auto',
                                    marginRight: 20,
                                    marginTop: 5,
                                }}
                                onPress={() => {
                                    console.log("hey");
                                    this.updateChoice('button3');
                                    console.log("hey");
                                    // selected={this.state.button3}
                                }} >
                                <Text style={{
                                    color: this.state.button3 ? accentColor(mood) : 'white',
                                    fontSize: 13,
                                    textAlign: 'center',
                                    fontFamily: 'Lato-Regular',
                                }}>{this.state.textValue3}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>


                    <View style={{ flexDirection: 'column', height: 70, width: 301, borderBottomWidth: 1, borderColor: 'black', alignSelf: "center", justifyContent: "center" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    backgroundColor: accentColor(mood),
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    width: 23,
                                    height: 23,
                                    borderWidth: 1,
                                }}
                                onPress={() => {
                                    //this.updateItemCompletionStatus("completedButton2");
                                }}
                            >
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'Lato-Regular',
                                paddingLeft: 10,
                                lineHeight: 24,
                                textDecorationLine: "line-through",
                            }}>Grab some Holiday lights</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginLeft: 33 }}><Text style={{ color: accentColor(mood), fontSize: 15, fontFamily: "Lato-Italic" }}>Claimed by: Sunny</Text></View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'column', height: 70, width: 301, borderBottomWidth: 1, borderColor: 'black', alignSelf: "center", justifyContent: "center" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    backgroundColor: "white",
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    width: 23,
                                    height: 23,
                                    borderWidth: 1,
                                }}
                                onPress={() => {
                                    //this.updateItemCompletionStatus("completedButton2");
                                }}
                            >
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'Lato-Regular',
                                paddingLeft: 10,
                                lineHeight: 24,
                            }}>Bring in some Apple Cider!</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginLeft: 33 }}><Text style={{ color: accentColor(mood), fontSize: 15, fontFamily: "Lato-Italic" }}>Claimed by: Tommy</Text></View>
                        </View>
                    </View>



                    <View style={{ flexDirection: 'column', height: 97, width: 301, borderBottomWidth: 1, borderColor: 'black', alignSelf: "center", opacity: this.state.hasHitAddButton ? 1 : 0 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 34.5 }}>

                            <TouchableOpacity
                                style={{
                                    borderColor: 'black',
                                    backgroundColor: this.state.completedButton4 ? accentColor(mood) : '#FFFFFF',
                                    paddingTop: 18,
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    width: 23,
                                    height: 23,
                                    borderWidth: 1,
                                }}
                                onPress={() => {
                                    this.updateItemCompletionStatus("completedButton4");
                                }}
                            >
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 20,
                                fontFamily: 'Lato-Regular',
                                paddingLeft: 10,
                                lineHeight: 24,
                                textDecorationLine: this.state.completedButton4 ? 'line-through' : 'none'
                            }}>Pumpkin spice, anyone?</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginLeft: 33, paddingTop: 5 }}><Text style={{ color: accentColor(mood), fontSize: 15, fontFamily: "Lato-Italic" }}>{this.state.claim4}</Text></View>
                            <TouchableOpacity
                                style={{
                                    borderColor: accentColor(mood),
                                    backgroundColor: this.state.button4 ? 'white' : accentColor(mood),
                                    opacity: 0.7,
                                    borderRadius: 11.5,
                                    justifyContent: "space-evenly",
                                    width: 95,
                                    height: 25,
                                    borderWidth: 1,
                                    marginLeft: 'auto',
                                    marginRight: 20,
                                    marginTop: 5,
                                }}
                                onPress={() => {
                                    console.log("hey");
                                    this.updateChoice('button4');
                                    console.log("hey");
                                }} >
                                <Text style={{
                                    color: this.state.button4 ? accentColor(mood) : 'white',
                                    fontSize: 13,
                                    textAlign: 'center',
                                    fontFamily: 'Lato-Regular',
                                }}>{this.state.textValue4}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "flex-end", marginBottom: 10, marginTop: "auto", marginRight: 20 }}>
                    <View style={{ justifyContent: "center" }}>
                        <TouchableOpacity
                            style={{
                                borderColor: accentColor(mood),
                                backgroundColor: '#FFFFFF',
                                alignSelf: "center",
                                opacity: 0.7,
                                borderRadius: 22.5,
                                width: 45,
                                height: 45,
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
                                fontSize: 35,
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
        fontSize: 22,
        textAlign: "center"
    },
});
