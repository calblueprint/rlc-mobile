import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Colors from "../../constants/Colors.js";
import { normalize } from "../../utils/Normalize";

export default class ConfirmationScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _navigateToMain = () => {
    this.props.navigateToMain();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.confirmationContainer}>
            <Text style={styles.heading}>Thanks!</Text>
            <Image
              style={styles.image}
              source={require("../../assets/images/rlclogo.png")}
            />
            <Text style={styles.text}>
              Thanks for signing up!
            </Text>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this._navigateToMain}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 25,
  },
  button: {
    backgroundColor: Colors.mainBlue,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    width: "85%",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 50,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.white,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  contentContainer: {
    paddingTop: 30,
  },
  image: {
    marginTop: 25,
    marginBottom: 25,
  },
  text: {
    fontSize: normalize(14),
  },
  confirmationContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  heading: {
    fontSize: normalize(20),
    color: "#000000",
    lineHeight: 24,
    textAlign: "center",
  }
});
