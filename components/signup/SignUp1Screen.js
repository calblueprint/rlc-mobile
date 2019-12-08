import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      user: {},
    }
  }

  //Setup User Payload
  setupParams = ()  => {
    this.setState({ user: this.props.user });
    this.state.user.firstname = this.state.firstName;
    this.state.user.lastname = this.state.lastName;
    this.state.user.birth_month = this.state.birth_month;
  }

  /*Checks conditions before transitioning to next screen:
   * 1. all fields are filled out and not empty.
   */
  checkValidNext = () => {
    if (this.state.firstName == "" || this.state.lastName == "" || this.state.birthday == "") {
      frontendError("Please fill out all fields.")
    } else {
      this.setupParams()
      this.props.setScreenForward(this.state.user)
    }
  }
  
  //Set state var birthday as today's date.
  componentDidMount = () => {
    this.getToday()
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
      <View behavior='padding' style={styles.container}>
        <StepsTimeline currentPosition={0}/>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
            <Text style={styles.heading}>We're excited to have you join the team! Tell us a little about yourself!</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.subHeading}>First Name</Text>
              <TextInput style={styles.input} placeholder={'Jane'} onChangeText={text => this.setState({firstName: text})}></TextInput>
              <Text style={styles.subHeading}>Last Name</Text>
              <TextInput style={styles.input} placeholder={'Doe'} onChangeText={text => this.setState({lastName: text})}></TextInput>
              <Text style={styles.subHeading}>Birthday</Text>
              <DatePicker format="YYYY-MM-DD" date={this.state.birthday} onDateChange={
                (date) => {
                  this.setState({birthday: date})
                  this.setState({birth_month: monthNames[parseInt(date.substr(5, 2))-1]})
               }
              } confirmBtnText={'Confirm'} cancelBtnText={'Cancel'}/>
            </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.checkValidNext}>
                  <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
        </View>
      </View>
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