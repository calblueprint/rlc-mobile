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
    this._onSelectNavigationMenu = this._onSelectNavigationMenu.bind(this);
  }

  // Navigate between screens by pressing one of the screens at the bottom tabbar.
  _onSelectNavigationMenu = (index) => () => {
    this.setState({currentScreenIndex: index})
  }

  //async logoutHandler() To be implemented.

  render() {
    return (
      <View>
        <View style={{ height: Sizes.height * 0.9, marginTop: Sizes.height * 0.02 }}>
          {this.state.currentScreenIndex == 0 && <ProfileScreen
            navigation={this.props.navigation}
            onNavSelect={this._onSelectNavigationMenu}
          />}
          {this.state.currentScreenIndex == 1 && <DashboardScreen
            navigation={this.props.navigation}
            onNavSelect={this._onSelectNavigationMenu}
          />}
          {this.state.currentScreenIndex == 2 && <SearchScreen
            navigation={this.props.navigation}
            onNavSelect={this._onSelectNavigationMenu}
          />}
          </View>
        <View style={{ height: Sizes.height * 0.08 }}>
          <NavigationFooter index={this.state.currentScreenIndex} navigationHandler={this._onSelectNavigationMenu} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenNavigatorScroll: {},
  MainScreen: {
    flex: 1,
    width: Sizes.width,
  },
});
