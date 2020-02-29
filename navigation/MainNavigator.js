import React from "react";
import { Platform } from "react-native";

// Navigation
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import {
  TransitionPresets
} from "react-navigation-stack";

// Screens
//import LogoScreen from "../screens/LogoScreen.js";
//import LoginScreen from "../screens/login/LoginScreen.js";
//import SignupScreen from "../screens/DefaultScreen.js";
import DashboardScreen2 from "../screens/dash/Dashboard2.js";
//import ShiftScreen from "../screens/shift/ShiftScreen.js";
import ProfileScreen from "../screens/profile/Profile.js";
import SearchScreen from "../screens/search/Search.js";
import TabBar from "../components/TabBar.js";
import TabBarIcon from "../components/TabBarIcon.js";


const routeConfiguration = {
  Profile: {screen: ProfileScreen, name:"Profile", tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={"person"}/>)},
  Dashboard: {screen: DashboardScreen2, name:"Dashboard", tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={"home"}/>)},
  Search: {screen: SearchScreen, name:"Search", tabBarIcon: ({ focused }) => (<TabBarIcon focused={focused} name={"search"}/>)}
}

const tabConfiguration = {
  tabBar: props => <TabBar {...props}/>, 
  headerMode: Platform.OS === "ios"? 'float':'screen',
  initialRouteName:"Dashboard",
  backBehavior: "history",
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid,
    cardOverlayEnabled: true,
    gestureEnabled: true,
  }
}

const MainNavigator = createBottomTabNavigator(routeConfiguration, tabConfiguration);

const App = createAppContainer(MainNavigator);

export default App;
