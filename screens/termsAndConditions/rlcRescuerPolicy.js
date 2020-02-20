import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class rlcRescuerPolicy extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
            Thank you for helping Rescuing Leftover Cuisine, Inc. (“RLC”) to achieve its mission of making food hunger a thing of the past! Rescuers, the volunteers of RLC, contribute to alleviating food waste and food hunger by helping to deliver food from our partners to those in need.
            </Text>

            <Text style={styles.getStartedText}>
            Please note that by volunteering with RLC you accept and agree to this Policy.
            </Text>

            <Text style={styles.getStartedText}>
            You certify that the personal information you used to register for an account on RLC’s website, www.rescuingleftovercuisine.org, is true, complete, correct, and you understand that if it is not, you will be disqualifying yourself for volunteer and future positions with RLC. You may not impersonate another individual.
            </Text>

            <Text style={styles.getStartedText}>
            <Text style={{fontWeight: 'bold'}}>Release from Liability: </Text>You acknowledge and agree that as a volunteer for RLC, you will not receive any monetary compensation or other form of remuneration from RLC. You agree to hold harmless and hereby indemnify RLC, its officers, directors, employees and/or representatives from any and all liability, claims, and demands of whatever kind or nature, either in law or in equity, which arise or may hereafter arise from the volunteer services you provide to RLC. You understand and acknowledge that this Release discharges RLC from any liability or claim that you may have if through the course of your volunteer work with RLC, you become injured, ill or require medical treatment.
            </Text>

            <Text style={styles.getStartedText}>
            <Text style={{fontWeight: 'bold'}}>Confidentiality: </Text>You acknowledge that in the course of your service to RLC, you may have access to or create confidential and/or proprietary information and intellectual property that is of value to RLC. As a volunteer, you understand that are in a position of trust and confidence and agree not to disclose confidential information and intellectual property belonging to, or obtained through your affiliation with Rescuing Leftover Cuisine, Inc. to any other person or entity.
            </Text>
            
            <Text style={styles.getStartedText}>
            <Text style={{fontWeight: 'bold'}}>Ownership: </Text>You also grant and convey to RLC all right, title, and interests in any and all works, including but not limited to all photographs, videos and other forms of media taken and/or produced by you in connection with the providing of services to RLC.
            </Text>

            <Text style={styles.getStartedText}>
            <Text style={{fontWeight: 'bold'}}>Information and Media Release: </Text>You understand that you may be photographed during the course of your volunteer activity. You hereby grant full and unlimited permission to RLC to use photographs, videos or other record of you for promotion, publicity, or other purposes, with or without identification of you by name.
            </Text>
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
    paddingBottom: 10,
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
