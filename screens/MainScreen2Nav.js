import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Sizes from "../constants/Sizes.js";

import DashboardScreen from "../screens/dash/Dashboard2.js";
import ProfileScreen from "../screens/profile/Profile.js";
import SearchScreen from "../screens/search/Search.js";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function Profile({navigation}) {
    return (
        <ProfileScreen navigation={navigation}
        />
    );
}

function Dashboard({navigation}) {
    return (
        <DashboardScreen navigation={navigation}
        />
    );
}
function Search({navigation}) {
    return (
        <SearchScreen navigation={navigation}
        />
    );
}

const Tab = createBottomTabNavigator();

export default function MainScreen2Nav() {
    return (
        <NavigationContainer>
            <Tab.Navigator
            >
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Search" component={Search} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}