import React, { Component } from '../../node_modules/react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import SignUp1Screen from '../../components/signup/SignUp1Screen';
import SignUp2Screen from '../../components/signup/SignUp2Screen';
import SignUp3Screen from '../../components/signup/SignUp3Screen';
import ConfirmationScreen from '../../components/signup/ConfirmationScreen'
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

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
  }

  //Set initial screen as Screen 1
  componentDidMount = () => {
    this.setState({ screen: <SignUp1Screen user={this.state.user} setScreenForward={this.setScreenForward} setScreenBackward={this.setScreenBackward} previousUserInfo={this.state.user} /> });
  }

  // Navigate to login screen; Passed into Confirmation screen
  navigateToLogin = () => {
    const { navigate } = this.props.navigation;
    navigate("Login");
  }

  //does request for user registration
  userPutRequest = params => {
    return postRequest(
      APIRoutes.signupPath(),
      responseData => {
        console.log("Successfully signed up User");
        console.log(responseData);
      },
      error => {
        console.log(error);
        console.log("Error posting User");
      },
      params
    );
  }

  createUserForStorage = () => {
    const user = {'user':{
      // TODO: Create a new userId on RLC website
      'userId': 5,
      'firstName': this.state.user.firstname,
      'lastName': this.state.user.lastname,
      'occupation': '',
      'phoneNumber': this.state.user.telephone,
      'address': '',
      'city': '',
      'state': '',
      'zipCode': '',
      'email': this.state.user.email,
      'password': this.state.user.password,
      'preferredRegion': this.state.user.preferredRegion,
      'preferredLocation': this.state.user.preferredLocation,
      'preferredTimes': this.state.user.preferredTimes,
      'birth_month': this.state.user.birth_month,
      'birth_year': this.state.user.birth_year
    }};
    console.log("User put in storage");
    console.log(user);
    this._asyncSignIn(user);
    this.userPutRequest(user);
  }

  _asyncSignIn = async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    this.props.navigation.navigate("Dashboard")
  }

  //Moves screen forward after user presses next button
  setScreenForward = (params) => {
    this.setState({ currentScreenNum: this.state.currentScreenNum + 1 }, () => { this.render() });
    this.updateUser(params)
  }

  //Moves to previous screen in sign up after user presses previous button
  setScreenBackward = (params) => {
    this.setState({ currentScreenNum: this.state.currentScreenNum - 1 }, () => { this.render() });
    this.updateUser(params)
  }


  render() {
    switch (this.state.currentScreenNum) {
      case 1:
        return <View style={styles.formContainer}>
          <SignUp1Screen
            user={this.state.user}
            setScreenForward={this.setScreenForward}
            setScreenBackward={this.setScreenBackward}
            previousUserInfo={this.state.user}
          />
        </View>
      case 2:
        return <View style={styles.formContainer}>
          <SignUp2Screen
            user={this.state.user}
            setScreenForward={this.setScreenForward}
            setScreenBackward={this.setScreenBackward}
            previousUserInfo={this.state.user}
          />
        </View>
      case 3:
        return <View style={styles.formContainer}>
          <SignUp3Screen
            user={this.state.user}
            setScreenForward={this.setScreenForward}
            setScreenBackward={this.setScreenBackward}
            previousUserInfo={this.state.user}
            createUserForStorage={this.createUserForStorage}
          />
        </View>
      case 4:
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
