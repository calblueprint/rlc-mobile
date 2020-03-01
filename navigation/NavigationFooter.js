import React from "react";
import { Platform, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { normalize } from "../utils/Normalize.js";

import FooterIcon from "../navigation/FooterIcons.js";

class NavigationFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{...styles.tabContainer,  ...{flexDirection: 'row'}}}>
        <TouchableOpacity onPress={this.props.navigationHandler}>
          <FooterIcon name="person" focused={this.props.index==0? true:false}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.navigationHandler}>
          <FooterIcon name="home" focused={this.props.index==0? true:false}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.navigationHandler}>
          <FooterIcon name="search" focused={this.props.index==0? true:false}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContainer : {
    backgroundColor : "#57A4D6"
  }
})

export default NavigationFooter;