// // Navigation
// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from 'react-navigation-stack';
// import { TransitionPresets } from "react-navigation-stack";
// // import { navigationRef } from './RootNavigation';

// // Screens
// import LogoScreen from "../screens/LogoScreen.js";
// import LoginScreen from "../screens/login/LoginScreen.js";
// import SignupScreen from "../screens/signup/SignUpScreen.js";
// import ConfirmationScreen from "../components/signup/ConfirmationScreen.js";
// import ShiftScreen from "../screens/shift/ShiftScreen.js";
// import ChangeConfirmScreen from "../screens/shift/ChangeConfirmScreen.js";
// import MainScreen from "../screens/MainScreen.js";
// import MainScreen2 from "../screens/MainScreen2Nav.js";

// const routeConfiguration = {
//   Logo: { screen: LogoScreen, name: "Logo" },
//   Login: { screen: LoginScreen, name: "Login" },
//   Signup: { screen: SignupScreen, name: "Signup" },
//   Shift: { screen: ShiftScreen, name: "Shift" },
//   ChangeConfirm: { screen: ChangeConfirmScreen, name: "ChangeConfirm" },
//   Main: { screen: MainScreen2, name: "Main" },
//   Confirmation: { screen: ConfirmationScreen, name: "Confirmation" },

// };

// const stackConfiguration = {
//   headerMode: "none",
//   initialRouteName: "Logo",
//   backBehavior: "history",
//   defaultNavigationOptions: {
//     ...TransitionPresets.FadeFromBottomAndroid,
//     cardOverlayEnabled: true,
//     gestureEnabled: false
//   },
//   // ref: { navigationRef },
// };

// const MainNavigator = createStackNavigator(
//   routeConfiguration,
//   stackConfiguration
// );

// const App = createAppContainer(MainNavigator);

// export default App;


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";

// Screens
import LogoScreen from "../screens/LogoScreen.js";
import LoginScreen from "../screens/login/LoginScreen.js";
import SignupScreen from "../screens/signup/SignUpScreen.js";
import ConfirmationScreen from "../components/signup/ConfirmationScreen.js";
import ShiftScreen from "../screens/shift/ShiftScreen.js";
import ChangeConfirmScreen from "../screens/shift/ChangeConfirmScreen.js";
import MainScreen from "../screens/MainScreen.js";
import MainScreen2 from "../screens/MainScreen2Nav.js";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Logo" headerMode="none">
        <Stack.Screen name="Logo" component={LogoScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Shift" component={ShiftScreen} />
        <Stack.Screen name="ChangeConfirm" component={ChangeConfirmScreen} />
        <Stack.Screen name="Main" component={MainScreen2} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}