import React from "react";
import { Platform, StyleSheet } from "react-native";

// Navigation
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";

// Screens
import LoginScreen from "../screens/login/LoginScreen.js";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/profile/Profile.js";
import DashboardScreen from "../screens/dash/Dashboard.js";
import DashboardScreen2 from "../screens/dash/Dashboard2.js";
import ShiftScreen from "../screens/shift/ShiftScreen.js";

const MainNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Dash: { screen: DashboardScreen2 }
  },
  {
    headerMode: "none",
    initialRouteName: "Login",
    defaultNavigationOptions: {
      ...TransitionPresets.FadeFromBottomAndroid,
      cardOverlayEnabled: true,
      gestureEnabled: true
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
