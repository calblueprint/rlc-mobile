import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { frontendError } from "../lib/alerts";
import { postRequest } from "../lib/requests";
import { APIRoutes } from "../config/routes";
import LocalStorage from "../helpers/LocalStorage";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  // User Login
  fetchUser = params => {
    return postRequest(
      APIRoutes.loginPath(),
      user => {
        const userJSON = {'userId': user.id,
          'firstname': user.firstname,
          'lastname': user.lastname,
          'occupation': user.occupation,
          'telephone': user.telephone,
          'address': user.address,
          'city': "",
          'state': "",
          'zip_code': user.zip_code,
          'email': user.email,
          'preferred_region_id': user.preferred_region_id,
          'preferred_location_id': user.preferred_location_id,
          'availability': ""
        }
        LocalStorage.storeItem('user', userJSON);
        this.props.navigateHandler();
      },
      error => {
        if (this.state.email == "" || this.state.password == "") {
          frontendError("There are empty fields.");
        } else {
          this.props.setInvalidText();
        }
        console.log(error);
      },
      params
    );
  };

  // Login Handler
  _onPressLogin = () => {
    const params = {
      user: {
        email: this.state.email,
        password: this.state.password,
        remember_me: 1
      }
    };
    this.fetchUser(params);
  };

  // Handler to Navigate to Signup
  _onPressSignup = () => {
    this.props.navigateToSignup();
  };

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <TextInput
          inlineImageLeft="mail"
          placeholder="Email"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={text => this.setState({ email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          autoCorrct={false}
        ></TextInput>

        <TextInput
          inlineImageLeft="lock"
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          ref={input => (this.passwordInput = input)}
          returnKeyType="go"
        ></TextInput>

        <View style={styles.bottomSignIn}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this._onPressLogin}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._onPressSignup}>
            <Text style={styles.signupText}>
              {" "}
              Don't have an account?
              <Text style={styles.helpLinkText}> Sign Up Here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  bottomSignIn: {
    position: "relative",
    bottom: 20,
    marginTop: "10%"
  },
  actionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    height: 80
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#3b3b3b",
    color: "#000000"
  },
  signupText: {
    height: 20,
    textAlign: "center"
  },
  buttonContainer: {
    backgroundColor: "#38A5DB",
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600"
  },
  rememberText: {
    textAlign: "left",
    textAlignVertical: "top"
  },
  inputIcon: {
    color: "#FFFFFF"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
    fontWeight: "600"
  }
});
