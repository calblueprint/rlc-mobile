import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { frontendError } from '../../lib/alerts';
import StepsTimeline from '../../components/StepsTimeline';

export default class SignUp3Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
    }
  }

  checkValidNext = () => {
    if (this.state.email == "" || this.state.password == "" || this.state.confirmPassword == "") {
      frontendError("Please fill out all fields.")
    } else if (this.state.password != this.state.confirmPassword) {
      frontendError("Passwords must match.")
    } else if (!this.state.password.match(/\d/) || !this.state.password.match(/[a-z]/i)) {
      frontendError("Passwords must have a number and a letter.")
    } else if (!this.state.email.match(/@/)) {
      frontendError("Invalid Email.")
    } else {
      this.props.setScreenForward()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StepsTimeline currentPosition={2}/>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Great! Now let's create your account. Your email will be your username.</Text>
            <Text>Email</Text>
            <TextInput placeholder={'email@email.com'} onChangeText={text => this.setState({email: text})}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder={'Please include one letter and one number'} onChangeText={text => this.setState({password: text})}></TextInput>
            <Text>Confirm Password</Text>
            <TextInput secureTextEntry={true} placeholder={'Please re-enter your password'} onChangeText={text => this.setState({confirmPassword: text})}></TextInput>
            <Button title='NEXT' onPress={this.checkValidNext}></Button>

          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
