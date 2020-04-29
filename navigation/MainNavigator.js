// Navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { TransitionPresets } from "react-navigation-stack";

// Screens
import LogoScreen from "../screens/LogoScreen.js";
import LoginScreen from "../screens/login/LoginScreen.js";
import SignupScreen from "../screens/signup/SignUpScreen.js";
import ConfirmationScreen from "../components/signup/ConfirmationScreen.js";
import ShiftScreen from "../screens/shift/ShiftScreen.js";
import ChangeConfirmScreen from "../screens/shift/ChangeConfirmScreen.js";
import MainScreen from "../screens/MainScreen.js";
import MainScreen2 from "../screens/MainScreen2Nav.js";
import Search from "../screens/search/Search.js";

const routeConfiguration = {
  Logo: { screen: LogoScreen, name: "Logo" },
  Login: { screen: LoginScreen, name: "Login" },
  Signup: { screen: SignupScreen, name: "Signup" },
  Shift: { screen: ShiftScreen, name: "Shift" },
  ChangeConfirm: { screen: ChangeConfirmScreen, name: "ChangeConfirm" },
  Main: { screen: MainScreen2, name: "Main" },
  Confirmation: { screen: ConfirmationScreen, name: "Confirmation" },
  Search: { screen: Search, name: "Search" },
};

const stackConfiguration = {
  headerMode: "none",
  initialRouteName: "Logo",
  backBehavior: "history",
  defaultNavigationOptions: {
    ...TransitionPresets.FadeFromBottomAndroid,
    cardOverlayEnabled: true,
    gestureEnabled: false
  }
};

const MainNavigator = createStackNavigator(
  routeConfiguration,
  stackConfiguration
);

const App = createAppContainer(MainNavigator);

export default App;
