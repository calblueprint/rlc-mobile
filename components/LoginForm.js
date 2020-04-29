import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  AsyncStorage,
} from "react-native";
import { frontendError } from "../lib/alerts";
import { postRequest, getRequest } from "../lib/requests";
import { APIRoutes } from "../config/routes";
import LocalStorage from "../helpers/LocalStorage";

import {
  fetch_regions,
  fetch_locations,
  fetch_locations_by_ids,
  fetch_regions_by_ids,
} from "../helpers/LocationHelpers";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  store_location_data = async () => {
    fetch_regions();
    fetch_locations();
  };

  // User Login
  fetchUser = async (params) => {
    this.store_location_data();

    let userObj = {};

    console.log("Logging in user")
    let request = await postRequest(
      APIRoutes.loginPath(),
      (user) => {
        userObj = {
          userId: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          occupation: user.occupation,
          phoneNumber: user.telephone,
          address: user.address,
          city: "",
          state: "",
          zipCode: user.zip_code,
          email: user.email,
          preferredRegionId: user.preferred_region_id,
          preferredLocationIds: user.preferred_location_id, //Mistitled array of ids.
          preferredTimes: "",
        };
      },
      (error) => {
        if (this.state.email == "" || this.state.password == "") {
          frontendError("There are empty fields.");
        } else {
          this.props.setInvalidText();
        }
        console.log(error);
      },
      params
    );
    console.log("Logging user logged in.")


    console.log(userObj)

    let preferredRegion = await fetch_regions_by_ids([userObj.preferredRegionId])[0];
    let preferredLocations = await fetch_locations_by_ids(userObj.preferredLocationIds);

    console.log(`Storing user: `, userObj)
    console.log(`preferred Region: ${preferredRegion.name} preferred Locations : ${preferredLocations.length}`)

    LocalStorage.storeItem("user", {
      userObj,
      preferredRegion: preferredRegion,
      preferredLocations: preferredLocations,
    });

    this.props.navigateHandler();
  };

  // Login Handler
  _onPressLogin = async () => {
    const params = {
      user: {
        email: this.state.email,
        password: this.state.password,
        remember_me: 1,
      },
    };
    await this.fetchUser(params);
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
          onChangeText={(text) => this.setState({ email: text })}
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
          onChangeText={(text) => this.setState({ password: text })}
          ref={(input) => (this.passwordInput = input)}
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
    padding: 20,
  },
  bottomSignIn: {
    position: "relative",
    bottom: 20,
    marginTop: "10%",
  },
  actionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    height: 80,
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#3b3b3b",
    color: "#000000",
  },
  signupText: {
    height: 20,
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#38A5DB",
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
  },
  rememberText: {
    textAlign: "left",
    textAlignVertical: "top",
  },
  inputIcon: {
    color: "#FFFFFF",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
    fontWeight: "600",
  },
});
