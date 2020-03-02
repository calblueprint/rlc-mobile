import React, { Component } from "../../node_modules/react";
import { StyleSheet, View } from "react-native";
import SignUp1Screen from "../../components/signup/SignUp1Screen";
import SignUp2Screen from "../../components/signup/SignUp2Screen";
import SignUp3Screen from "../../components/signup/SignUp3Screen";
import SignUp4Screen from "../../components/signup/SignUp4Screen";
import SignUp5Screen from "../../components/signup/SignUp5Screen";
import ConfirmationScreen from "../../components/signup/ConfirmationScreen";
import { postRequest } from "../../lib/requests";
import { APIRoutes } from "../../config/routes";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreenNum: 1,
      screen: null,
      user: {}
    };
  }

  updateUser = params => {
    for (var k in params) {
      if (params.hasOwnProperty(k)) {
        this.state.user[k] = params[k];
      }
    }
  };

  //Set initial screen as Screen 1
  componentDidMount = () => {
    this.setState({
      screen: <SignUp1Screen setScreenForward={this.setScreenForward} />
    });
  };

  // Navigate to login screen; Passed into Confirmation screen
  navigateToLogin = () => {
    const { navigate } = this.props.navigation;
    navigate("Login");
  };

  //does post request for user registration
  userPostRequest = params => {
    return postRequest(
      APIRoutes.signupPath(),
      responseData => {
        console.log("User registration successful.");
        console.log(responseData);
      },
      error => {
        console.log("Error");
      },
      params
    );
  };

  //sets up payload for user registration
  registerUser = () => {
    const params = {
      user: this.state.user
    };
    // this.userPostRequest(params);
  };

  //Moves screen forward after user presses next button
  setScreenForward = params => {
    this.setState({ currentScreenNum: this.state.currentScreenNum + 1 });
    this.updateUser(params);
    if (this.state.currentScreenNum == 5) {
      this.registerUser();
    }
    this.renderCurrentScreen();
  };

  //Renders the appropriate screen depending on currentScreenNum
  renderCurrentScreen = () => {
    // switch (this.state.currentScreenNum) {
    //   case 0:
          
    //       <SignUp1Screen
    //         user={this.state.user}
    //         setScreenForward={this.setScreenForward}
    //       />
    //     break;
    //   case 1:
          
    //       <SignUp2Screen
    //         user={this.state.user}
    //         setScreenForward={this.setScreenForward}
    //       />
    //     break;
    //   case 2:
          
    //       <SignUp3Screen
    //         user={this.state.user}
    //         setScreenForward={this.setScreenForward}
    //       />
    //     break;
    //   case 3:
          
    //       <SignUp4Screen
    //         user={this.state.user}
    //         setScreenForward={this.setScreenForward}
    //       />
    //     break;
    //   case 4:
          
    //       <SignUp5Screen
    //         user={this.state.user}
    //         setScreenForward={this.setScreenForward}
    //       />
    //     break;
    //   case 5:
          
    //       <ConfirmationScreen
    //         setScreenForward={this.setScreenForward}
    //         navigateToLogin={this.navigateToLogin}
    //       />
    //     break;
    // }
  };

  render() {
    switch (this.state.currentScreenNum) {
      case 0:
          return <View style={styles.formContainer}>
            <SignUp1Screen
              user={this.state.user}
              setScreenForward={this.setScreenForward}
            />
          </View>
      case 1:
          return <View style={styles.formContainer}>
            <SignUp2Screen
              user={this.state.user}
              setScreenForward={this.setScreenForward}
            />
          </View>
      case 2:
          return <View style={styles.formContainer}>
            <SignUp3Screen
              user={this.state.user}
              setScreenForward={this.setScreenForward}
            />
          </View>
      case 3:
          return <View style={styles.formContainer}>
            <SignUp4Screen
              user={this.state.user}
              setScreenForward={this.setScreenForward}
            />
          </View>
      case 4:
          return <View style={styles.formContainer}>
            <SignUp5Screen
              user={this.state.user}
              setScreenForward={this.setScreenForward}
            />
          </View>
      case 5:
          return <View style={styles.formContainer}>
            <ConfirmationScreen
              setScreenForward={this.setScreenForward}
              navigateToLogin={this.navigateToLogin}
            />
          </View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  formContainer: {
    height: "100%",
    marginTop: "10%"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-start",
    marginTop: 40,
    maxHeight: 200
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: "#000000",
    marginTop: 30,
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.9,
    fontSize: 22
  },
  subtext: {
    color: "#ff0000",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "normal",
    opacity: 0.85,
    fontSize: 16
  }
});
