import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// Constants
import Styles from "../constants/Styles";
import Sizes from "../constants/Sizes";

class LogoScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    setTimeout(toMain, 1400);

    function toMain() {
      navigate("Onboarding");
    }

    return (
      <View style={{ ...Styles.container, ...styles.container }}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/rlclogo2.png")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: "40%"
  },
  logo: {
    width: "40%",
    height: Sizes.width * 0.4
  }
});

export default LogoScreen;
