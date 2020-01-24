import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import LoginScreen from '../screens/login/LoginScreen.js';
import ProfileScreen from '../screens/profile/Profile.js';
import DashboardScreen from '../screens/dash/Dashboard.js';

import DashboardScreen2 from '../screens/dash/Dashboard2.js';
import ShiftScreen from '../screens/shift/ShiftScreen.js';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: LoginScreen,  
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const DashboardStack = createStackNavigator(
  {
    Dashboard: DashboardScreen2,
  },
  config
);

DashboardStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

DashboardStack.path = '';


const LinksStack = createStackNavigator(
  {
    Links: DashboardScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
)

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

ProfileStack.path = '';

const ShiftStack = createStackNavigator(
     {
       Shift: ShiftScreen,  
     },
     config
   );
   
   ShiftStack.navigationOptions = {
     tabBarLabel: 'Shift',
     tabBarIcon: ({ focused }) => (
       <TabBarIcon
         focused={focused}
         name={
           Platform.OS === 'ios'
             ? `ios-information-circle${focused ? '' : '-outline'}`
             : 'md-information-circle'
         }
       />
     ),
   };
   
   ShiftStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  ProfileStack,
  DashboardStack,
  ShiftStack,
});

tabNavigator.path = '';

export default tabNavigator;
