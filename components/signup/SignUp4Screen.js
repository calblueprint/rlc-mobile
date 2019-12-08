import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import StepsTimeline from '../../components/StepsTimeline';
import { frontendError } from '../../lib/alerts';

export default class SignUp4Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      telephone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      user: {},
    }
  }

  //Setup User Payload
  setupParams = ()  => {
    this.setState({ user: this.props.user });
    this.state.user.telephone = this.state.telephone;
    this.state.user.address = this.state.address1 + ", " + this.state.address2 + ", " + this.state.city + ", " + this.state.state;
    this.state.user.zip_code = this.state.zipcode;
  }

  /*Checks conditions before transitioning to next screen:
   * 1. all fields are filled out and not empty.
   * 2. zipcodes contain only numbers
   * 3. phone numbers contain only numbers
   */
  checkValidNext = () => {
    if (this.state.telephone == "" || this.state.address1 == "" || this.state.address2 == "" || this.state.zipcode == "" || this.state.city == "" || this.state.state == "") {
      frontendError("Please fill out all fields.")
    } else if (this.state.zipcode.match(/[a-z]/i)) {
      frontendError("Invalid zipcode.")
    } else if (this.state.telephone.match(/[a-z]/i)) {
      frontendError("Invalid telephone number.")
    } else {
      this.setupParams()
      this.props.setScreenForward(this.state.user)
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <StepsTimeline currentPosition={3}/>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
            <Text style={styles.heading}>Almost there! Let us know the best way to contact you.</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.subHeading}>Mobile Phone Number</Text>
              <TextInput 
                style={styles.input} 
                keyboardType="phone-pad"
                placeholder={'(123)-456-7890'} 
                onChangeText={text => this.setState({telephone: text})}
                returnKeyType={"next"}
                onSubmitEditing={() => this.address1Input.focus()}></TextInput>
              <Text style={styles.subHeading}>Address (Line 1)</Text>
              <TextInput 
                style={styles.input}
                placeholder={'123 45th St.'} 
                onChangeText={text => this.setState({address1: text})}
                returnKeyType={"next"}
                onSubmitEditing={() => this.address2Input.focus()}
                ref={(input) => {this.address1Input = input;}}></TextInput>
              <Text style={styles.subHeading}>Address (Line 2)</Text>
              <TextInput 
                style={styles.input} 
                placeholder={'Apt #6A'} 
                onChangeText={text => this.setState({address2: text})}
                returnKeyType={"next"}
                onSubmitEditing={() => this.cityInput.focus()}
                ref={(input) => {this.address2Input = input;}}></TextInput>
              <Text style={styles.subHeading}>City</Text>
              <TextInput 
                style={styles.input} 
                placeholder={'Seattle'} 
                onChangeText={text => this.setState({city: text})}
                returnKeyType={"next"}
                onSubmitEditing={() => this.stateInput.focus()}
                ref={(input) => {this.cityInput = input;}}></TextInput>
              <Text style={styles.subHeading}>State</Text>
              <TextInput 
                style={styles.input} 
                placeholder={'Washington'} 
                onChangeText={text => this.setState({state: text})}
                returnKeyType={"next"}
                onSubmitEditing={() => this.zipCodeInput.focus()}
                ref={(input) => {this.stateInput = input;}}></TextInput>
              <Text style={styles.subHeading}>Zip Code</Text>
              <TextInput 
                style={styles.input} 
                placeholder={'12345'} 
                onChangeText={text => this.setState({zipcode: text})}
                ref={(input) => {this.zipCodeInput = input;}}></TextInput>
            </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.checkValidNext}>
                  <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  button: {
    backgroundColor: '#38A5DB',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    width: 320
  }, 
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 50
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: "uppercase"
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#3b3b3b',
    color: '#000000',
  },
  inputContainer: {
    paddingTop: 25,
  },
  subHeading: {
    color: '#000000',
    marginTop: 10,
    textAlign: 'left',
    fontWeight: '600',
    opacity: 0.9,
    fontSize: 14
  },
  contentContainer: {
    padding: 25,
    paddingTop: 30,
  },
  heading: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
  },
});