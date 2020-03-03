import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import Sizes from "../constants/Sizes.js";

class NavigationFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{...styles.tabContainer,  ...{flexDirection: 'row'}}}>
        <TouchableOpacity onPress={this.props.navigationHandler}>
          <Image source={{ uri : `../assets/images/person-${this.props.index == 0? "focused":"outline"}.png` }} style={{ width: 22, height: 20 }}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.navigationHandler}>
          <Image source={{ uri : `../assets/images/home-${this.props.index == 1? "focused":"outline"}.png` }} style={{ width: 22, height: 20 }}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.navigationHandler}>
          <Image source={{ uri : `../assets/images/search-${this.props.index == 2? "focused":"outline"}.png` }} style={{ width: 22, height: 20 }}/>
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
    justifyContent: "space-between"
  }
})

export default NavigationFooter;