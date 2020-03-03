import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import Sizes from "../constants/Sizes.js";

class NavigationFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    // const profileString
    const profile = <Image source={require("../assets/images/person-outline.png")} style={{ width: 22, height: 20 }}/>;
    const profileFocused =  <Image source={require("../assets/images/person-focused.png")} style={{ width: 22, height: 20 }}/>;
    const dashboard = <Image source={require("../assets/images/home-outline.png")} style={{ width: 22, height: 20 }}/>;
    const dashboardFocused =  <Image source={require("../assets/images/home-focused.png")} style={{ width: 22, height: 20 }}/>;
    const search   = <Image source={require("../assets/images/search-outline.png")} style={{ width: 22, height: 20 }}/>;
    const searchFocused =  <Image source={require("../assets/images/search-focused.png")} style={{ width: 22, height: 20 }}/>;

    return (
      <View style={{...styles.tabContainer,  ...{flexDirection: 'row'}}}>
        <TouchableOpacity onPress={this.props.navigationHandler}>
          {this.props.index == 0? profile: profileFocused}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.navigationHandler}>
          {this.props.index == 1? dashboard: dashboardFocused}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.navigationHandler}>
          {this.props.index == 2? search: searchFocused}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContainer : {
    backgroundColor : "#57A4D6",
    width: Sizes.width,
    paddingHorizontal: 30,
    paddingBottom: "0.065%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  }
})

export default NavigationFooter;