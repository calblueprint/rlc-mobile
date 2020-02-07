import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Default template for creating new screens and components in React Native.

class LogoScreen extends React.Component {
  static navigationOptions = {
    title: "Default"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
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
