import React from 'react';
import { Button, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import StepsTimeline from '../../components/StepsTimeline';
import { CheckBox } from 'react-native-elements'
import { frontendError } from '../../lib/alerts';

const regions = [{
     name: "Albany, NY"
    }, {
     name: "Amarillo, TX"
    }, {
     name: "New York City, NY"
    }, {
     name: "San Francisco, CA"
    }, {
     name: "Washington DC"
 }
]

const locations = [{
     name: "Battery Park City"
    }, {
     name: "Bowery"
    }, {
     name: "Carnegie Hall"
    }, {
     name: "Chelsea"
    }, {
     name: "Chinatown"
    }, {
     name: "Civic Center"
    }, {
     name: "Clinton"
    }, {
     name: "East Harlem"
    }
]

const daysandtimes = [{
     name: "Select all times",
     id: 0,
     times: []
    }, {
     name: "Monday",
     id: 1,
     times: [{name: "9am to 12pm", id: 2}, {name: "12pm to 4pm", id: 3}, {name: "4pm to 8pm", id: 4}, {name: "8pm to 12 am", id: 5}]
    }, {
     name: "Tuesday",
     id: 6,
     times: [{name: "9am to 12pm", id: 7}, {name: "12pm to 4pm", id: 8}, {name: "4pm to 8pm", id: 9}, {name: "8pm to 12 am", id: 10}]
    }, {
     name: "Wednesday",
     id: 11,
     times: [{name: "9am to 12pm", id: 12}, {name: "12pm to 4pm", id: 13}, {name: "4pm to 8pm", id: 14}, {name: "8pm to 12 am", id: 15}]
    }, {
     name: "Thursday",
     id: 16,
     times: [{name: "9am to 12pm", id: 17}, {name: "12pm to 4pm", id: 18}, {name: "4pm to 8pm", id: 19}, {name: "8pm to 12 am", id: 20}]
    }, {
     name: "Friday",
     id: 21,
     times: [{name: "9am to 12pm", id: 22}, {name: "12pm to 4pm", id: 23}, {name: "4pm to 8pm", id: 24}, {name: "8pm to 12 am", id: 25}]
    }, {
     name: "Saturday",
     id: 26,
     times: [{name: "9am to 12pm", id: 27}, {name: "12pm to 4pm", id: 28}, {name: "4pm to 8pm", id: 29}, {name: "8pm to 12 am", id: 30}]
    }, {
     name: "Sunday",
     id: 31,
     times: [{name: "9am to 12pm", id: 32}, {name: "12pm to 4pm", id: 33}, {name: "4pm to 8pm", id: 34}, {name: "8pm to 12 am", id: 35}]
    }
]

const foodWeights = [{
     name: "Light"
    }, {
     name: "Medium"
    }, {
     name: "Heavy"
    }
]

export default class SignUp5Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRegion: [],
      selectedLocation: [],
      selectedTimes: [],
      selectedWeights: [],
      agreementChecked: false,
      eighteen: false,
    }
  }

  //Setup User Payload
  setupParams = ()  => {
    this.setState({ user: this.props.user });
    //TODO: ISSUE #9 - https://github.com/calblueprint/rlc-mobile/issues/9
  }

  /*Checks conditions before transitioning to next screen:
   * 1. all fields are filled out and not empty.
   * 2. agree to terms and conditions and RLC rescuer policy.
   * 3. 18 years or older.
   */
  checkValidNext = () => {
    if (this.state.selectedRegion == "" || this.selectedLocation == "" || this.state.selectedTimes == "" || this.state.selectedWeights == "") {
      frontendError("Please fill out all fields.")
    } else if (this.state.agreementChecked == false) {
      frontendError("Please agree to the Terms and Conditions and RLC Rescuer Policy.")
    } else if (this.state.eighteen == true) {
      frontendError("All volunteers must be at least 18 years old to lead a rescue.")
    } else {
      this.setupParams()
      this.props.setScreenForward(this.state.user)
    }
  }

  onSelectedRegionChange = (selectedRegion) => {
    this.setState({selectedRegion});
  }

  onSelectedLocationChange = (selectedLocation) => {  
    this.setState({selectedLocation});
  }

  onSelectedTimesChange = (selectedTimes) => {
    this.setState({selectedTimes});
  }

  onSelectedWeightsChange = (selectedWeights) => {
    this.setState({selectedWeights});
  }

  render() {
    return (
      <View style={styles.container}>
        <StepsTimeline currentPosition={4}/>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>Last step! Tell us your preferences so we can find you the best events.</Text>
            <Text style={styles.subHeading}>
                 Preferred Region*
            </Text>
            <SectionedMultiSelect
                 single
                 selectedItems={this.state.selectedRegion}
                 items={regions}
                 uniqueKey="name"
                 onSelectedItemsChange={this.onSelectedRegionChange}
                 searchPlaceholderText="Search for a region"
                 searchInputStyle={styles.input}
                 submitButtonText="Select"
                 confirmText="SAVE"
            />

            <Text style={styles.subHeading}>
                 Preferred Location
            </Text>
            <SectionedMultiSelect
                 single
                 selectedItems={this.state.selectedLocation}
                 items={locations}
                 uniqueKey="name"
                 onSelectedItemsChange={this.onSelectedLocationChange}
                 showChips={false}
                 searchPlaceholderText="Search locations..."
                 searchInputStyle={styles.input}
                 submitButtonText="Select"
                 confirmText="SAVE"
            />

            <Text style={styles.subHeading}>
              Preferred Time(s)
            </Text>
            <SectionedMultiSelect
                  selectedItems={this.state.selectedTimes}
                  items={daysandtimes}
                  uniqueKey="id"
                  expandDropDowns={true}
                  onSelectedItemsChange={this.onSelectedTimesChange}
                  subKey="times"
                  showChips={false}
                  searchInputStyle={styles.input}
                  submitButtonText="Select"
                  confirmText="SAVE"
            />

            <Text style={styles.subHeading}>
                 Preferred Food Weight to Carry
            </Text>
            <SectionedMultiSelect
                 selectedItems={this.state.selectedWeights}
                 items={foodWeights}
                 uniqueKey="name"
                 onSelectedItemsChange={this.onSelectedWeightsChange}
                 showChips={false}
                 submitButtonText="Select"
                 confirmText="SAVE"
            />

            <CheckBox title="By creating an account, you agree to the Terms and Conditions and RLC Rescuer Policy." checked={this.state.agreementChecked} onPress={() => this.setState({agreementChecked: !this.state.agreementChecked})}/>
            <CheckBox title='If you are under 18, please check this box.' checked={this.state.eighteen} onPress={() => this.setState({eighteen: !this.state.eighteen})}/>
            <Button title='COMPLETE' onPress={this.checkValidNext} />
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
  heading: {
        color: '#000000',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'left',
        fontWeight: '600',
        opacity: 0.9,
        fontSize: 20
    },
    subHeading: {
        color: '#000000',
        marginTop: 10,
        textAlign: 'left',
        fontWeight: '600',
        opacity: 0.9,
        fontSize: 14
    },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    marginHorizontal: 10,
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
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#3b3b3b',
    color: '#000000',
    },
});
