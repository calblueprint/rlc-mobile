import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import { frontendError } from '../../lib/alerts';

export default class resetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      newPasswordConfirm: "",
    }
  }

  checkValidNext = () => {
    if (this.state.newPassword == "" || this.state.newPasswordConfirm == "") {
      frontendError("Please fill out all fields.")
    } else if (this.state.newPassword != this.state.newPasswordConfirm) {
      frontendError("Passwords must match.")
    } else if (!this.state.newPassword.match(/\d/) || !this.state.newPassword.match(/[a-z]/i)) {
      frontendError("Passwords must have a number and a letter.")
    } else {
      
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <TextInput placeholder={'New password'} secureTextEntry onChangeText={text => this.setState({newPassword: text})}></TextInput>
            <TextInput placeholder={'Enter new password again'} secureTextEntry onChangeText={text => this.setState({newPasswordConfirm: text})}></TextInput>
            <Button title='Reset Password' onPress={this.resetPassword}></Button>
            <Button title='Go Back to Sign In' ></Button>
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
