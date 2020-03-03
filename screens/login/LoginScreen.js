import React, { Component } from "../../node_modules/react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  KeyboardAvoidingView
} from "react-native";

// Components
import LoginForm from "../../components/LoginForm.js";

// Constants
import Styles from "../../constants/Styles";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inValidText: ""
    };
  }

  setInvalidText = () => {
    this.setState({ inValidText: "⚠️ The username/password is invalid" });
  };

  navigateToMain = () => {
    const { navigate } = this.props.navigation;
    navigate("Main");
  };

  navigateToSignup = () => {
    const { navigate } = this.props.navigation;
    navigate("Signup");
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView>
          <View style={Styles.logoContainer}>
            <Image
              style={Styles.logo}
              source={require("../../assets/images/rlclogo.png")}
            />
            <Text style={Styles.title}>Let's rescue some food 👍</Text>
            <Text style={Styles.subtext}>{this.state.inValidText}</Text>
          </View>
          <View style={styles.formContainer}>
            <LoginForm
              setInvalidText={this.setInvalidText}
              navigateHandler={this.navigateToMain}
              navigateToSignup={this.navigateToSignup}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  formContainer: {
    height: "100%"
  }
});
