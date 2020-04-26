import React, { Component } from "../../node_modules/react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform
} from "react-native";

// Components
import LoginForm from "../../components/LoginForm.js";

// Constants
import Styles from "../../constants/Styles";
const offset = (Platform.OS === 'android') ? -200 : 0;

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
      <KeyboardAvoidingView keyboardVerticalOffset={offset} behavior={Platform.OS === "ios" ? "padding" : ""} style={Styles.container}>
        <View style={Styles.logoContainer}>
          <Image
            style={Styles.logo}
            source={require("../../assets/images/rlclogo.png")}
          />
          <Text style={Styles.title}>Let's rescue some food 👍</Text>
          <View style={{ marginBottom: -12 }}><Text style={Styles.subtext}>{this.state.inValidText}</Text></View>
        </View>
        <View style={styles.formContainer}>
          <LoginForm
            setInvalidText={this.setInvalidText}
            navigateHandler={this.navigateToMain}
            navigateToSignup={this.navigateToSignup}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    height: "100%",
  }
});
