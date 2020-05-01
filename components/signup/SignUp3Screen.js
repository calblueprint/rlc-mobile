import React from "react";
import * as Location from "expo-location";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import StepsTimeline from "../../components/StepsTimeline";
import { CheckBox } from "react-native-elements";
import { frontendError } from "../../lib/alerts";

import Colors from "../../constants/Colors";
import { normalize } from "../../utils/Normalize";

import {
  fetch_regions,
  fetch_locations,
  fetch_locations_by_region,
  parseCurrentLocation,
  fetch_locations_by_ids,
  fetch_regions_by_ids,
} from "../../helpers/LocationHelpers.js";

const daysandtimes = [
  {
    name: "Select all times",
    id: 0,
    times: [],
  },
  {
    name: "Monday",
    id: 1,
    times: [
      { name: "9am to 12pm", id: 2 },
      { name: "12pm to 4pm", id: 3 },
      { name: "4pm to 8pm", id: 4 },
      { name: "8pm to 12 am", id: 5 },
    ],
  },
  {
    name: "Tuesday",
    id: 6,
    times: [
      { name: "9am to 12pm", id: 7 },
      { name: "12pm to 4pm", id: 8 },
      { name: "4pm to 8pm", id: 9 },
      { name: "8pm to 12 am", id: 10 },
    ],
  },
  {
    name: "Wednesday",
    id: 11,
    times: [
      { name: "9am to 12pm", id: 12 },
      { name: "12pm to 4pm", id: 13 },
      { name: "4pm to 8pm", id: 14 },
      { name: "8pm to 12 am", id: 15 },
    ],
  },
  {
    name: "Thursday",
    id: 16,
    times: [
      { name: "9am to 12pm", id: 17 },
      { name: "12pm to 4pm", id: 18 },
      { name: "4pm to 8pm", id: 19 },
      { name: "8pm to 12 am", id: 20 },
    ],
  },
  {
    name: "Friday",
    id: 21,
    times: [
      { name: "9am to 12pm", id: 22 },
      { name: "12pm to 4pm", id: 23 },
      { name: "4pm to 8pm", id: 24 },
      { name: "8pm to 12 am", id: 25 },
    ],
  },
  {
    name: "Saturday",
    id: 26,
    times: [
      { name: "9am to 12pm", id: 27 },
      { name: "12pm to 4pm", id: 28 },
      { name: "4pm to 8pm", id: 29 },
      { name: "8pm to 12 am", id: 30 },
    ],
  },
  {
    name: "Sunday",
    id: 31,
    times: [
      { name: "9am to 12pm", id: 32 },
      { name: "12pm to 4pm", id: 33 },
      { name: "4pm to 8pm", id: 34 },
      { name: "8pm to 12 am", id: 35 },
    ],
  },
];

const colors = {
  primary: "#38A5DB",
};

export default class SignUp3Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preferredRegion: [],
      preferredLocation: [],
      preferredTimes: [],
      agreementChecked: false,
      user: {},
      isFetching: true,
      regions: [],
      locations: [],
    };
  }

  //Setup User Payload
  setupParams = () => {
    this.setState({ user: this.props.user });
    this.state.user.preferredRegion = this.state.preferredRegion;
    this.state.user.preferredLocation = this.state.preferredLocation;
    this.state.user.preferredTimes = this.state.preferredTimes;
    this.state.user.agreementChecked = this.state.agreementChecked;
    //TODO: ISSUE #9 - https://github.com/calblueprint/rlc-mobile/issues/9
  };

  componentDidMount = () => {
    if (this.props.previousUserInfo.preferredRegion != null) {
      this.setState({
        preferredRegion: this.props.previousUserInfo.preferredRegion,
      });
    }
    if (this.props.previousUserInfo.preferredLocation != null) {
      this.setState({
        preferredLocation: this.props.previousUserInfo.preferredLocation,
      });
    }
    if (this.props.previousUserInfo.preferredTimes != null) {
      this.setState({
        preferredTimes: this.props.previousUserInfo.preferredTimes,
      });
    }
    if (this.props.previousUserInfo.agreementChecked) {
      this.setState({
        agreementChecked: this.props.previousUserInfo.agreementChecked,
      });
    }
    this._fetch_regions_locations();
  };

  _fetch_regions_locations = async () => {
    let regions = await fetch_regions(); // Works
    let locations = await fetch_locations(); // Returns empty
    this.setState({
      regions: regions,
      locations: locations,
      isFetching: false,
    });
  };

  /*Checks conditions before transitioning to next screen:
   * 1. all fields are filled out and not empty.
   * 2. agree to terms and conditions and RLC rescuer policy.
   */
  checkValidNext = () => {
    if (
      this.state.preferredRegion.length == 0 ||
      this.state.preferredLocation.length == 0 || // I think this field is labeled as optional so shouldn't be checked.
      this.state.preferredTimes == ""
    ) {
      frontendError("Please fill out all fields.");
    } else if (this.state.agreementChecked == false) {
      frontendError(
        "Please agree to the Terms and Conditions and RLC Rescuer Policy."
      );
    } else {
      this.setupParams();
      this.props.setScreenForward(this.state.user);
      this.props.createUserForStorage();
    }
  };

  // Single select, expects array of length 1
  onPreferredRegionChange = async (preferredRegionId) => {
    let included_locations = await fetch_locations_by_region(
      preferredRegionId[0]
    );
    this.setState({
      preferredRegion: preferredRegionId,
      preferredLocation: [],
      locations:
        included_locations === undefined || included_locations.length == 0
          ? []
          : included_locations,
    });
  };

  onPreferredLocationChange = (preferredLocationIds) => {
    this.setState({ preferredLocation : preferredLocationIds });
  };

  onPreferredTimesChange = (preferredTimes) => {
    this.setState({ preferredTimes });
  };

  // Check user's current location and find corresponding regions, restrict choices in form for locations to those within region.
  setCurrentRegion = async () => {
    let Locpermissions = await Location.requestPermissionsAsync();
    if (Locpermissions.status != "granted") {
      await Location.requestPermissionsAsync();
    } else {
      let user_coordinates = await Location.getCurrentPositionAsync({
        accuracy: 4,
      });

      let preferred_region = await parseCurrentLocation(
        user_coordinates.coords
      );

      await this.onPreferredRegionChange([preferred_region.id]);
    }
  };

  gotoPrevStep = () => {
    this.props.setScreenBackward(this.state.user);
  };

  render() {
    if (this.state.isFetching) {
      return null;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.gotoPrevStep}>
              <Text style={styles.buttonText}>PREVIOUS</Text>
            </TouchableOpacity>
          </View>
          <StepsTimeline currentPosition={2} />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.heading}>
              Last step! Tell us your event preferences so we can match you with
              the best events.
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.subHeading}>Preferred Region*</Text>
              <View style={styles.currentLocationButtonContainer}>
                <TouchableOpacity
                  style={styles.currentLocationButton}
                  onPress={this.setCurrentRegion}
                >
                  <Text style={styles.currentLocationButtonText}>
                    Current Location
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.regionsubHeading}>- or -</Text>
              <SectionedMultiSelect
                single
                colors={colors}
                selectedItems={this.state.preferredRegion}
                items={this.state.regions}
                uniqueKey="id"
                displayKey="name"
                onSelectedItemsChange={this.onPreferredRegionChange}
                searchPlaceholderText="Search regions..."
                searchInputStyle={styles.input}
                modalWithSafeAreaView={true}
                submitButtonText="Select"
                confirmText="SAVE"
                value={this.state.preferredRegion}
                styles={{
                  selectToggle: {
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    height: 40,
                  },
                  selectToggleText: {
                    fontSize: normalize(14),
                    color: "#333333",
                  },
                }}
              />

              <Text style={styles.subHeading}>Preferred Location(s)</Text>
              <SectionedMultiSelect
                colors={colors}
                selectedItems={this.state.preferredLocation}
                items={this.state.locations}
                uniqueKey="id"
                displayKey="name"
                onSelectedItemsChange={this.onPreferredLocationChange}
                showChips={false}
                searchPlaceholderText="Search locations..."
                searchInputStyle={styles.input}
                modalWithSafeAreaView={true}
                submitButtonText="Select"
                confirmText="SAVE"
                value={this.state.preferredLocation}
                styles={{
                  selectToggle: {
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    height: 40,
                  },
                  selectToggleText: {
                    fontSize: normalize(14),
                    color: "#333333",
                  },
                }}
              />

              <Text style={styles.subHeading}>Preferred Time(s)</Text>
              <SectionedMultiSelect
                hideSearch
                colors={colors}
                selectedItems={this.state.preferredTimes}
                items={daysandtimes}
                uniqueKey="id"
                expandDropDowns={true}
                onSelectedItemsChange={this.onPreferredTimesChange}
                subKey="times"
                showChips={false}
                searchInputStyle={styles.input}
                modalWithSafeAreaView={true}
                submitButtonText="Select"
                confirmText="SAVE"
                value={this.state.preferredTimes}
                styles={{
                  selectToggle: {
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    height: 40,
                  },
                  selectToggleText: {
                    fontSize: normalize(14),
                    color: "#333333",
                  },
                }}
              />
              <CheckBox
                title="By creating an account, you agree to the Terms and Conditions and RLC Rescuer Policy."
                checked={this.state.agreementChecked}
                onPress={() =>
                  this.setState({
                    agreementChecked: !this.state.agreementChecked,
                  })
                }
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.checkValidNext}
            >
              <Text style={styles.buttonText}>COMPLETE</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  button: {
    backgroundColor: Colors.mainBlue,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    width: 320,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 50,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.white,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  currentLocationButton: {
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    width: 320,
    borderWidth: 2,
    borderColor: Colors.mainBlue,
  },
  currentLocationButtonContainer: {
    alignItems: "center",
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 50,
  },
  currentLocationButtonText: {
    textAlign: "center",
    color: Colors.mainBlue,
    fontWeight: "600",
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    color: "#333333",
  },
  inputContainer: {
    paddingTop: 25,
  },
  subHeading: {
    color: "#333333",
    marginTop: 10,
    textAlign: "left",
    fontWeight: "600",
    opacity: 0.9,
    fontSize: normalize(14),
  },
  regionsubHeading: {
    color: "#333333",
    textAlign: "center",
    opacity: 0.9,
    fontSize: normalize(14),
  },
  contentContainer: {
    padding: 25,
    paddingTop: 30,
  },
  heading: {
    fontSize: normalize(20),
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
  },
});
