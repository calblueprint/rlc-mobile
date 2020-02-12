import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Constants
import Styles from "../constants/Styles";

class LogoScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={Styles.logoContainer}>
          <Image
            style={Styles.logo}
            source={require("../../assets/images/rlclogo.png")}
          />
          <Text style={Styles.title}>Let's rescue some food 👍</Text>
          <Text style={Styles.subtext}>{this.state.inValidText}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LogoScreen;
