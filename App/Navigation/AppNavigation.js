import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react';
import { Dimensions, View } from 'react-native';
import HomeScreen from '../Screens/HomeScreen'
import ThoughtsScreen from '../Screens/ThoughtsScreen'
import AddThoughtScreen from '../Screens/AddThoughtScreen.js'
import CheckInScreen from '../Screens/CheckInScreen'
import TasksScreen from '../Screens/TasksScreen'
import OffsitesScreen from '../Screens/TaskCategoryScreens/OffsitesScreen'
import OfficeEventsScreen from '../Screens/TaskCategoryScreens/OfficeEventsScreen'
import OfficeSpaceScreen from '../Screens/TaskCategoryScreens/OfficeSpaceScreen'
import InclusivityScreen from '../Screens/TaskCategoryScreens/InclusivityScreen'
import OtherScreen from '../Screens/TaskCategoryScreens/OtherScreen'
import FoodScreen from '../Screens/TaskCategoryScreens/FoodScreen'
import TasksWeeklyLunchesScreen from '../Screens/TasksWeeklyLunches';
import TasksBdayScreen from '../Screens/TaskBday';
import TasksMiamiScreen from '../Screens/TaskMiami';
import TasksHolidayScreen from '../Screens/TaskHoliday';
import TasksCreativeSpaceScreen from '../Screens/TaskCreativeSpace';
import ActionItemsCreativeSpaceScreen from '../Screens/ActionItemsCreativeSpace';
import ActionItemsMisbahBdayScreen from '../Screens/ActionItemsMisbahBday';
import ActionItemsMiamiTripScreen from '../Screens/ActionItemsMiamiTrip';
import ActionItemsHolidayScreen from '../Screens/ActionItemsHoliday';
import ActionItemsWeeklyLunchesScreen from '../Screens/ActionItemsWeeklyLunches';
import CreateTaskOne from '../Screens/CreateTaskOne'
import CreateTaskTwo from '../Screens/CreateTaskTwo'
import CreateTaskThree from '../Screens/CreateTaskThree'
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../selection.json';
const expoAssetId = require("../../assets/fonts/icomoon.ttf");
const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', expoAssetId);

var { height, width } = Dimensions.get('window');
var firstCheckIn = false;

const MajMoodNav = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
}, {
  initialRouteName: 'HomeScreen',
  headerMode: 'float',
  tabBarOptions: {
    activeTintColor: '',
    inactiveTintColor: '#DADADA',
  },
})

const ThoughtsNav = createStackNavigator({
  ThoughtsScreen: { screen: ThoughtsScreen },
  CreateTaskOne: { screen: CreateTaskOne },
  CreateTaskTwo: { screen: CreateTaskTwo },
  CreateTaskThree: { screen: CreateTaskThree },
  AddThoughtScreen: { screen: AddThoughtScreen },
  TasksWeeklyLunches: { screen: TasksWeeklyLunchesScreen }
}, {
  initialRouteName: 'ThoughtsScreen',
  headerMode: 'float',
  lazy: false,
  tabBarOptions: {
    activeTintColor: '',
    inactiveTintColor: '#DADADA',
  },
})

const TasksNav = createStackNavigator({
  TasksScreen: {screen: TasksScreen},
  OffsitesScreen: {screen: OffsitesScreen},
  OfficeEventsScreen: {screen: OfficeEventsScreen},
  OfficeSpaceScreen: {screen: OfficeSpaceScreen},
  InclusivityScreen: {screen: InclusivityScreen},
  FoodScreen: {screen: FoodScreen},
  OtherScreen: {screen: OtherScreen},
  TasksWeeklyLunches: {screen: TasksWeeklyLunchesScreen},
  TaskBday:{screen: TasksBdayScreen},
  TaskMiami:{screen: TasksMiamiScreen},
  TaskHoliday:{screen: TasksHolidayScreen},
  TaskCreativeSpace:{screen: TasksCreativeSpaceScreen},
  ActionItemsCreativeSpace:{screen: ActionItemsCreativeSpaceScreen},
  ActionItemsMisbahBday:{screen: ActionItemsMisbahBdayScreen},
  ActionItemsMiamiTrip:{screen: ActionItemsMiamiTripScreen},
  ActionItemsHoliday:{screen: ActionItemsHolidayScreen},
  ActionItemsWeeklyLunches:{screen: ActionItemsWeeklyLunchesScreen},
  HomeScreen: { screen: HomeScreen }
}, {
  initialRouteName: 'TasksScreen',
  initialRouteParams: { mood: "mood" },
  lazy: false,
  headerMode: 'float',
  tabBarOptions: {
    activeTintColor: 'green',
    inactiveTintColor: '#DADADA',
  },
})

const CheckInNav = createStackNavigator({
  CheckInScreen: { screen: CheckInScreen },
}, {
  initialRouteName: 'CheckInScreen',
  headerMode: "none",
  tabBarOptions: {
    activeTintColor: '',
    inactiveTintColor: '#DADADA',
  },
});

const TabNav = createBottomTabNavigator({
  CheckInScreen: { screen: CheckInNav },
  MajMoodScreen: { screen: MajMoodNav },
  ThoughtsScreen: { screen: ThoughtsNav },
  TasksScreen: { screen: TasksNav },
}, {
  initialRouteName: 'CheckInScreen',
  defaultNavigationOptions: ({ navigation }) => ({
    params: ({firstCheckIn: false}),
    tabBarVisible: (firstCheckIn || navigation.state.routeName === "TasksScreen" || navigation.state.routeName === "ThoughtsScreen") ? true : false,
  }),
  tabBarOptions: {
    activeTintColor: '#000000',
    inactiveTintColor: '#DADADA',
    showLabel: false,
  },
})

MajMoodNav.navigationOptions = ({ navigation }) => {
  firstCheckIn = true;
  return {
    tabBarIcon: ({ tintColor }) => (
      <View style={{width: height * 0.05}}>
        <CustomIcon name="moods" size={height * 0.033} color={tintColor} />
      </View>
    ),
  };
};

ThoughtsNav.navigationOptions = ({ navigation }) => {
  firstCheckIn = true;
  return {
    tabBarIcon: ({ tintColor }) => (
      <View style={{width: height * 0.05}}>
        <CustomIcon name="thoughts" size={height * 0.033} color={tintColor} />
      </View>
    ),
  };
};

TasksNav.navigationOptions = ({ navigation }) => {
  firstCheckIn = true;
  return {
    tabBarIcon: ({ tintColor }) => (
      <View style={{width: height * 0.05}}>
        <CustomIcon name="taskList" size={height * 0.033} color={tintColor} />
      </View>
    ),
  };
};


CheckInNav.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: ({ tintColor }) => (
      <View style={{width: height * 0.05}}>
        <CustomIcon name="checkIn" size={height * 0.03} color={tintColor} />
      </View>
    ),
  };
};


const AppContainer = createAppContainer(TabNav);
export default AppContainer;
