import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Sizes from "../constants/Sizes.js";

import DashboardScreen from "../screens/dash/Dashboard2.js";
import ProfileScreen from "../screens/profile/Profile.js";
import SearchScreen from "../screens/search/Search.js";
import NavigationFooter from "../navigation/NavigationFooter.js";

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreenIndex: 1, //default to Dashboard
    };
    this._onNavigationScrollEnd = this._onNavigationScrollEnd.bind(this);
    this._onSelectNavigationMenu = this._onSelectNavigationMenu.bind(this);
  }

  // Used for horizontal swiping to navigate between the screens.
  _onNavigationScrollEnd(event) {
    let scrollToIndex = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    if (this.state.currentScreenIndex !== scrollToIndex) {
      this.setState({ currentScreenIndex: scrollToIndex });
    }
  }

  // Navigate between screens by pressing one of the screens at the bottom tabbar.
  _onSelectNavigationMenu(index) {
    this.refs["MainScrollView"].scrollTo({
      x: Sizes.width * index,
      y: 0,
      animated: true,
    });
  }

  //async logoutHandler() To be implemented.

  render() {
    return (
      <SearchScreen
        navigation={this.props.navigation}
        onNavSelect={this._onSelectNavigationMenu}
      />
    );
  }
}

const styles = StyleSheet.create({
  screenNavigatorScroll: {},
  MainScreen: {
    flex: 1,
    width: Sizes.width,
  },
});
