import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { frontendError } from '../../lib/alerts';
import StepsTimeline from '../../components/StepsTimeline';
import DatePicker from 'react-native-datepicker'

export default class SignUp1Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      birthday: "",
      telephone: "",
      user: {},
    }
  }

  //Setup User Payload
  setupParams = ()  => {
    this.setState({ user: this.props.user });
    this.state.user.firstname = this.state.firstName;
    this.state.user.lastname = this.state.lastName;
    this.state.user.birth_month = this.state.birth_month;
    this.state.user.birth_year = this.state.birth_year;
    this.state.user.telephone = this.state.telephone;
  }

  /*Checks conditions before transitioning to next screen:
   * 1. all fields are filled out and not empty.
   */
  checkValidNext = () => {
    if (this.state.firstName == "" || this.state.lastName == "" || this.state.birthday == "" || this.state.telephone == "") {
      frontendError("Please fill out all fields.")
    } else if (this.state.telephone.match(/[a-z]/i)) {
      frontendError("Invalid telephone number.")
    } else {
      this.setupParams()
      this.props.setScreenForward(this.state.user)
    }
  }
  
  gotoPrevStep = () => {
    this.props.setScreenBackward(this.state.user)
  }

  //Set state var birthday as today's date.
  componentDidMount = () => {
    this.getToday()
    if (this.props.previousUserInfo.firstname != null) {
      this.setState({ firstName: this.props.previousUserInfo.firstname })
    }
    if (this.props.previousUserInfo.lastname != null) {
      this.setState({ lastName: this.props.previousUserInfo.lastname })
    }
    if (this.props.previousUserInfo.birthday != null) {
      this.setState({ birthday: this.props.previousUserInfo.birthday })
    }
    if (this.props.previousUserInfo.telephone != null) {
      this.setState({ telephone: this.props.previousUserInfo.telephone })
    }
  }

  //Sets state var birthday as today's date.
  getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;
    this.setState({ birthday: today });
    this.setState({ birth_month: monthNames[mm-1]})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StepsTimeline currentPosition={0}/>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
            <Text style={styles.heading}>We're excited to have you join the team! First off, tell us a little bit about yourself!</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.subHeading}>First Name</Text>
              <TextInput
                style={styles.input} 
                placeholder={'Jane'} 
                onChangeText={text => this.setState({firstName: text})}
                returnKeyType={"next"}
                onSubmitEditing={() => this.lastNameInput.focus()}
                value={this.state.firstName}
              ></TextInput>
              <Text style={styles.subHeading}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder={'Doe'}
                onChangeText={text => this.setState({lastName: text})}
                returnKeyType={"next"}
                ref={(input) => {this.lastNameInput = input;}}
                value={this.state.lastName}
              ></TextInput>
              <Text style={styles.subHeading}>Birthday</Text>
              <DatePicker format="YYYY-MM-DD" date={this.state.birthday} style={styles.datePicker} onDateChange={
                (date) => {
                  this.setState({birthday: date})
                  this.setState({birth_month: monthNames[parseInt(date.substr(5, 2))-1]})
                  this.setState({birth_year: parseInt(date.substr(0, 4))});
                }
              } confirmBtnText={'Confirm'} cancelBtnText={'Cancel'} value={this.state.birthday}/>
              <Text style={styles.subHeading}>Mobile Phone Number</Text>
              <TextInput 
                style={styles.input} 
                keyboardType="phone-pad"
                placeholder={'(123)-456-7890'} 
                onChangeText={text => this.setState({telephone: text})}
                returnKeyType={"next"}
                value={this.state.telephone}></TextInput>
            </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.checkValidNext}>
                  <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25
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
    borderBottomColor: '#333333',
    color: '#333333',
  },
  datePicker: {
    marginBottom: 20,
    marginTop: 5,
  },
  inputContainer: {
    paddingTop: 25,
  },
  subHeading: {
    color: '#333333',
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
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
  },
});