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
import StepsTimeline from '../../components/StepsTimeline';
import { frontendError } from '../../lib/alerts';

export default class SignUp4Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
    }
  }

  /*Checks conditions before transitioning to next screen:
   * 1. all fields are filled out and not empty.
   * 2. zipcodes contain only numbers
   * 3. phone numbers contain only numbers
   */
  checkValidNext = () => {
    if (this.state.phone == "" || this.state.address1 == "" || this.state.address2 == "" || this.state.zipcode == "" || this.state.city == "" || this.state.state == "") {
      frontendError("Please fill out all fields.")
    } else if (this.state.zipcode.match(/[a-z]/i)) {
      frontendError("Invalid zipcode.")
    } else if (this.state.phone.match(/[a-z]/i)) {
      frontendError("Invalid phone number.")
    } else {
      this.props.setScreenForward()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StepsTimeline currentPosition={3}/>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Almost there! Let us know the best way to contact you.</Text>
            <Text>Mobile Phone Number</Text>
            <TextInput placeholder={'(123)-456-7890'} onChangeText={text => this.setState({phone: text})}></TextInput>
            <Text>Address (Line 1)</Text>
            <TextInput placeholder={'123 45th St.'} onChangeText={text => this.setState({address1: text})}></TextInput>
            <Text>Address (Line 2)</Text>
            <TextInput placeholder={'Apt #6A'} onChangeText={text => this.setState({address2: text})}></TextInput>
            <Text>City</Text>
            <TextInput placeholder={'Seatle'} onChangeText={text => this.setState({city: text})}></TextInput>
            <Text>State</Text>
            <TextInput placeholder={'Washington'} onChangeText={text => this.setState({state: text})}></TextInput>
            <Text>Zip Code</Text>
            <TextInput placeholder={'12345'} onChangeText={text => this.setState({zipcode: text})}></TextInput>
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
