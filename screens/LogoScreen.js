import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import LocalStorage from '../helpers/LocalStorage.js';

// Constants
import Styles from "../constants/Styles";
import Sizes from "../constants/Sizes";
import Colors from "../constants/Colors";

class LogoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  autoNavigate = async () => {
    const { navigate } = this.props.navigation;
    try {
      let user = await LocalStorage.getNonNullItem('user'); // function using AsyncStorage
      if (user) {
        navigate("Main");
      } else {
        navigate("Login");
      }
    } catch (err) {
      navigate("Login")
    }
  };

  render() {
    setTimeout(this.autoNavigate, 1500);

    return (
      <View style={{ ...Styles.container, ...styles.container }}>
        <View style={{ flex: 6 }}></View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/rlclogo2.png")}
          />
        </View>
        <View style={{ flex: 8 }}></View>
        <View style={styles.textContainer}>
          <Text style={styles.smallText}>from</Text>
          <Image
            style={styles.smallLogo}
            source={require("../assets/images/blueprint.png")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    padding: "10%",
  },
  logoContainer: {
    flex: 6,
    alignItems: "center",
  },
  logo: {
    flex: 1,
    width: "60%",
    height: Sizes.width * 0.4,
    resizeMode: "contain"
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  largeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0078e8",
  },
  smallText: {
    fontSize: 14,
    fontWeight: "400",
  },
  smallLogo: {
    width: "100%",
    height: Sizes.width * 0.1,
    resizeMode: "contain"
  },


});

export default LogoScreen;
