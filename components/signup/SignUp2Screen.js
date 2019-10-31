import React from 'react';

import { Button, Platform, ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { CheckBox, Card } from 'react-native-elements'

import { frontendError } from '../../lib/alerts';
import StepsTimeline from '../../components/StepsTimeline';

export default class SignUp2Screen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          volunteer: false,
          rescuer: false,
      }
  }
  
  onCheckboxClick = (cardType) => {
    if (cardType == "volunteer") {
      this.setState({volunteer: !this.state.volunteer})
      this.setState({rescuer: false})
    } else {
      this.setState({rescuer: !this.state.rescuer})
      this.setState({volunteer: false})
    }
  }

  checkValidNext = () => {
    if (this.state.volunteer == false && this.state.rescuer == false) {
      frontendError("Please select an option.")
    } else {
      this.props.setScreenForward()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StepsTimeline currentPosition={1}/>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Hi! How would you like to help?</Text>
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
