import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { frontendError } from "../../lib/alerts";
import StepsTimeline from "../../components/StepsTimeline";

import Colors from "../../constants/Colors";
import { normalize } from "../../utils/Normalize";

export default class SignUp2Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      user: {},
    };
  }

  componentDidMount = () => {
    if (this.props.previousUserInfo.email != null) {
      this.setState({ email: this.props.previousUserInfo.email });
    }
    if (this.props.previousUserInfo.password != null) {
      this.setState({ password: this.props.previousUserInfo.password });
    }
    if (this.props.previousUserInfo.confirmPassword != null) {
      this.setState({ birthday: this.props.previousUserInfo.confirmPassword });
    }
  };

  /*Checks conditions before transitioning to next screen:
   * 1. all fields are filled out and not empty.
   * 2. password and confirmPassword fields match.
   * 3. passwords have at least one number and letter.
   * 4. email contains an "@" character.
   */
  checkValidNext = () => {
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.confirmPassword == ""
    ) {
      frontendError("Please fill out all fields.");
    } else if (this.state.password.length <= 8) {
      frontendError("Passwords must be more than 8 characters long.");
    } else if (this.state.password != this.state.confirmPassword) {
      frontendError("Passwords must match.");
    } else if (
      !this.state.password.match(/\d/) ||
      !this.state.password.match(/[a-z]/i)
    ) {
      frontendError("Passwords must have a number and a letter.");
    } else if (!this.state.email.match(/@/)) {
      frontendError("Invalid Email.");
    } else {
      const { email, password } = this.state;
      this.props.setScreenForward( { ...this.props.user, email, password } );
    }
  };

  gotoPrevStep = () => {
    this.props.setScreenBackward(this.state.user);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.gotoPrevStep}>
            <Text style={styles.buttonText}>PREVIOUS</Text>
          </TouchableOpacity>
        </View>
        <StepsTimeline currentPosition={1} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.heading}>
            Hi {this.props.previousUserInfo.firstname}! Let's continue setting
            up your account. Your email will be your username!
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.subHeading}>
              Email (this will also be your username)
            </Text>
            <TextInput
              style={styles.input}
              placeholder={"email@email.com"}
              autoCapitalize={"none"}
              returnKeyType={"next"}
              keyboardType={"email-address"}
              onChangeText={(text) => this.setState({ email: text })}
              onSubmitEditing={() => this.passwordInput.focus()}
              value={this.state.email}
            ></TextInput>
            <Text style={styles.subHeading}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder={"Please include one letter and one number"}
              returnKeyType={"next"}
              onChangeText={(text) => this.setState({ password: text })}
              onSubmitEditing={() => this.confirmPasswordInput.focus()}
              ref={(input) => {
                this.passwordInput = input;
              }}
              value={this.state.password}
            ></TextInput>
            <Text style={styles.subHeading}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder={"Please re-enter your password"}
              returnKeyType={"next"}
              onChangeText={(text) => this.setState({ confirmPassword: text })}
              ref={(input) => {
                this.confirmPasswordInput = input;
              }}
              value={this.state.confirmPassword}
            ></TextInput>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.checkValidNext}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    color: "#333333",
  },
  inputContainer: {
    paddingTop: 25,
  },
  subHeading: {
    color: "#333333",
    marginTop: 10,
    textAlign: "left",
    fontWeight: "600",
    opacity: 0.9,
    fontSize: normalize(14),
  },
  contentContainer: {
    padding: 25,
    paddingTop: 30,
  },
  heading: {
    fontSize: normalize(20),
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
  },
});
