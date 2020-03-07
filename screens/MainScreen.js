import React from "react";
import {StyleSheet, ScrollView, View } from "react-native";
import Sizes from "../constants/Sizes.js";

import DashboardScreen from "../screens/dash/Dashboard2.js";
import ProfileScreen from "../screens/profile/Profile.js";
import SearchScreen from "../screens/search/Search.js";
import NavigationFooter from "../navigation/NavigationFooter.js";

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreenIndex: 1 //default to Dashboard
        };
        this._onNavigationScrollEnd = this._onNavigationScrollEnd.bind(this);
        this._onSelectNavigationMenu = this._onSelectNavigationMenu.bind(this);
      }
    
    // Used for horizontal swiping to navigate between the screens.
    _onNavigationScrollEnd(event) {
    let currentPage = Math.round(
        event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    if (this.state.currentPage !== currentPage) {
        this.setState({ currentPage });
    }
    console.log(this.state.currentScreenIndex);
    }

    // Navigate between screens by pressing one of the screens at the bottom tabbar.
    _onSelectNavigationMenu(index) {
    this.refs["MainScrollView"].scrollTo({
        x: Sizes.width * index,
        y: 0,
        animated: true
    });
    this.setState({
        currentScreenIndex: index
    })
    console.log(this.state.currentScreenIndex)
    }

    //async logoutHandler() To be implemented.
    
    render() {
        return (
            <View>
            <ScrollView
                ref="MainScrollView"
                style={styles.screenNavigatorScroll}
                contentContainerStyle={{ height: Sizes.height * 0.92, width: Sizes.width * 3 }}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                contentOffset={{
                x: Sizes.width * this.state.currentScreenIndex,
                y: 0
                }}
            >
                <ProfileScreen
                    navigation={this.props.navigation}
                    onNavSelect={this._onSelectNavigationMenu}
                />
                <DashboardScreen
                    navigation={this.props.navigation}
                    onNavSelect={this._onSelectNavigationMenu}
                />
                <SearchScreen
                    navigation={this.props.navigation}
                    onNavSelect={this._onSelectNavigationMenu}
                />
            </ScrollView>
            <View style={{height: Sizes.height * 0.08}}>
                <NavigationFooter index = {this.state.currentScreenIndex} navigationHandler={this._onSelectNavigationMenu}/>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screenNavigatorScroll: {
    },
    MainScreen: {
      flex: 1,
      width: Sizes.width
    }
  });