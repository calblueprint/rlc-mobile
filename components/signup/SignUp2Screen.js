import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { CheckBox, Card } from 'react-native-elements'
import { frontendError } from '../../lib/alerts';
import StepsTimeline from '../../components/StepsTimeline';

export default class SignUp2Screen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          volunteer: false,
          rescuer: false,
          user: {},
      }
  }
  
  //Setup User Payload
  setupParams = ()  => {
    this.setState({ user: this.props.user });
    if (this.state.volunteer == true) {
      this.state.user.role = 0;
    } else {
      this.state.user.role = 1;
    }
  }

  //Ensures that only one user options is selected and not both.
  onCheckboxClick = (cardType) => {
    if (cardType == "volunteer") {
      this.setState({volunteer: !this.state.volunteer})
      this.setState({rescuer: false})
    } else {
      this.setState({rescuer: !this.state.rescuer})
      this.setState({volunteer: false})
    }
  }

  /*Checks conditions before transitioning to next screen:
   * 1. either volunteer or rescuer is selected but not both.
   */
  checkValidNext = () => {
    if (this.state.volunteer == false && this.state.rescuer == false) {
      frontendError("Please select an option.")
    } else {
      this.setupParams()
      this.props.setScreenForward(this.state.user)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StepsTimeline currentPosition={1}/>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
            <Text style={styles.heading}>Hi! How would you like to help?</Text>
            <View style={styles.inputContainer}>
              <Card title='Volunteer'>
                  <CheckBox title='Click Here' checked={this.state.volunteer} onPress={() => this.onCheckboxClick("volunteer")}/>
                  <Text>- Take less than an hour of your time to deliver excess food from food businesses like restaurants to homeless shelters.</Text>
                  <Text>- Help be the transportation solution and get food that would otherwise be wasted to feed the hungry!</Text>
                </Card>
                <Card title='Lead Rescuer'>
                  <CheckBox title='Click Here' checked={this.state.rescuer} onPress={() => this.onCheckboxClick("rescuer")}/>
                  <Text>- Lead volunteers on food rescue events by taking attendance and reporting the number of pounds of food rescued.</Text>
                  <Text>- Must pass training session.</Text>
                  <Text>- Must commit at least 1-2 hours a week for at least 3-4 months.</Text>
                  <Text>- Receive Letter of Participation as proof of volunteer work!</Text>
                  <Text></Text>
                  <Text>*RLC will contact you with next steps</Text>
                </Card>
            </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.checkValidNext}>
                  <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
        </View>
      </View>
    );
  }
}

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