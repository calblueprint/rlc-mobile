import React, { Component } from "../../node_modules/react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import SignUp1Screen from "../../components/signup/SignUp1Screen";
import SignUp2Screen from "../../components/signup/SignUp2Screen";
import SignUp3Screen from "../../components/signup/SignUp3Screen";
import ConfirmationScreen from "../../components/signup/ConfirmationScreen";
import { putRequest } from "../../lib/requests";
import { APIRoutes } from "../../config/routes";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreenNum: 1,
      screen: null,
      user: {},
    };
  }

  //Set initial screen as Screen 1
  componentDidMount = () => {
    this.setState({
      screen: (
        <SignUp1Screen
          user={this.state.user}
          setScreenForward={this.setScreenForward}
          setScreenBackward={this.setScreenBackward}
          previousUserInfo={this.state.user}
        />
      ),
    });
  };

  // Navigate to login screen; Passed into Confirmation screen
  navigateToLogin = () => {
    const { navigate } = this.props.navigation;
    navigate("Login");
  };

  //Moves screen forward after user presses next button
  setScreenForward = (params) => {
    this.setState({ currentScreenNum: this.state.currentScreenNum + 1 }, () => {
      this.render();
    });
    this.updateUser(params);
  };

  //Moves to previous screen in sign up after user presses previous button
  setScreenBackward = (params) => {
    this.setState({ currentScreenNum: this.state.currentScreenNum - 1 }, () => {
      this.render();
    });
    this.updateUser(params);
  };

  //does request for user registration
  userPutRequest = (params) => {
    return putRequest(
      APIRoutes.signupPath(),
      (responseData) => {
        console.log("User registration successful.");
        console.log(responseData);
      },
      (error) => {
        console.log("Error");
      },
      params
    );
  };

  updateUser = (params) => {
    for (var k in params) {
      if (params.hasOwnProperty(k)) {
        this.state.user[k] = params[k];
      }
    }
  };

  _asyncSignIn = async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    this.props.navigation.navigate("Dashboard");
  };

  createUserForStorage = () => {
    const user = {
      //Lots of changes we need to update these everywhere
      firstname: this.state.user.firstname,
      lastname: this.state.user.lastname,
      email: this.state.user.email,
      birth_month: this.state.user.birth_month,
      telephone: this.state.user.telephone,
      address: "",
      preferred_region_id: this.state.user.preferred_region_id,
      preferred_location_id: this.state.user.preferred_location_id,
      availability: null, // Temporarily moving out of signup flow
      zip_code: "",
      city: "",
      state: "",
    };
    try { 
      this.userPutRequest(user);
      this.fetchUser(user);
    } catch(error) {
      console.log(error)
    }
    this._asyncSignIn(user);
  };

  render() {
    switch (this.state.currentScreenNum) {
      case 1:
        return (
          <View style={styles.formContainer}>
            <SignUp1Screen
              user={this.state.user}
              setScreenForward={this.setScreenForward}
              setScreenBackward={this.setScreenBackward}
              previousUserInfo={this.state.user}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.formContainer}>
            <SignUp2Screen
              user={this.state.user}
              setScreenForward={this.setScreenForward}
              setScreenBackward={this.setScreenBackward}
              previousUserInfo={this.state.user}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.formContainer}>
            <SignUp3Screen
              user={this.state.user}
              setScreenForward={this.setScreenForward}
              setScreenBackward={this.setScreenBackward}
              previousUserInfo={this.state.user}
              createUserForStorage={this.createUserForStorage}
            />
          </View>
        );
      case 4:
        return (
          <View style={styles.formContainer}>
            <ConfirmationScreen
              setScreenForward={this.setScreenForward}
              navigateToLogin={this.navigateToLogin}
            />
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  formContainer: {
    height: "100%",
    marginTop: "10%",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-start",
    marginTop: 40,
    maxHeight: 200,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: "#000000",
    marginTop: 30,
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.9,
    fontSize: 22,
  },
  subtext: {
    color: "#ff0000",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "normal",
    opacity: 0.85,
    fontSize: 16,
  },
});
