import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import LocalStorage from '../helpers/LocalStorage.js';

// Constants
import Styles from "../constants/Styles";
import Sizes from "../constants/Sizes";

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
    setTimeout(this.autoNavigate, 1400);

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
