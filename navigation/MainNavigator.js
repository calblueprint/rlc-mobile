// Navigation
import { createAppContainer, createStackNavigator } from "react-navigation";
import {
  TransitionPresets
} from "react-navigation-stack";

// Screens
import LogoScreen from "../screens/LogoScreen.js";
import LoginScreen from "../screens/login/LoginScreen.js";
import SignupScreen from "../screens/DefaultScreen.js";
import ShiftScreen from "../screens/shift/ShiftScreen.js";
import MainScreen from "../screens/MainScreen.js";


const routeConfiguration = {
  Logo: {screen: LogoScreen, name:"Logo"},
  Login: {screen: LoginScreen, name:"Login"},
  Signup: {screen: SignupScreen, name:"Signup"},
  Shift: {screen: ShiftScreen, name:"Shift"},
  Main: {screen: MainScreen, name:"Main"}
}

const stackConfiguration = {
  headerMode: 'none',
  initialRouteName:"Main",
  backBehavior: "history",
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid,
    cardOverlayEnabled: true,
    gestureEnabled: true,
  }
}

const MainNavigator = createStackNavigator(routeConfiguration, stackConfiguration);

const App = createAppContainer(MainNavigator);

export default App;
