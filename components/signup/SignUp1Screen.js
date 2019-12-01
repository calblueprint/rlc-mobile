import React from 'react';
import { Button, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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
      <View style={styles.container}>
        <StepsTimeline currentPosition={0}/>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>We're excited to have you join the team! Tell us a little about yourself!</Text>
            <Text>First Name</Text>
            <TextInput placeholder={'Jane'} onChangeText={text => this.setState({firstName: text})}></TextInput>
            <Text>Last Name</Text>
            <TextInput placeholder={'Doe'} onChangeText={text => this.setState({lastName: text})}></TextInput>
            <Text>Birthday</Text>
            <DatePicker format="YYYY-MM-DD" date={this.state.birthday} onDateChange={
              (date) => {
                this.setState({birthday: date})
                this.setState({birth_month: monthNames[parseInt(date.substr(5, 2))-1]})
              }
            }/>
            <Button title='NEXT' onPress={this.checkValidNext}></Button>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
