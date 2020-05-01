import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Sizes from "../constants/Sizes.js";
import Colors from "../constants/Colors";

import { Icon } from "react-native-elements";

import DashboardScreen from "../screens/dash/Dashboard2.js";
import ProfileScreen from "../screens/profile/Profile.js";
import SearchScreen from "../screens/search/Search.js";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function Profile({ navigation }) {
    return (
        <ProfileScreen navigation={navigation} />
    );
}

function Dashboard({ navigation }) {
    return (
        <DashboardScreen navigation={navigation} />
    );
}

function Search() {
    return (
        <SearchScreen />
    );
}

const Tab = createBottomTabNavigator();

export default function MainScreen2Nav({ navigation: rootNavigation }) {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Dashboard"
                screenOptions={{ gestureEnabled: false, swipeEnabled: false, }}
                tabBarOptions={{ activeTintColor: "#fefefe", style: { backgroundColor: Colors.mainBlue }, }}
            >
                <Tab.Screen name="Profile" component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name="Dashboard" component={Dashboard}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name="Search" component={Search}
                    options={{
                        tabBarLabel: 'Search',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="search" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer >
    );
}