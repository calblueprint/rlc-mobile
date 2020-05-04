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
import Sizes from "../../constants/Sizes";
import { normalize } from "../../utils/Normalize";

import {
  fetch_regions,
  fetch_locations,
  fetch_locations_by_region,
  parseCurrentLocation,
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


export default class SignUp3Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preferred_region_id: [],
      preferred_location_id: [],
      availability: [],
      agreementChecked: false,
      user: {},
      isFetching: true,
      regions: [],
      locations: [],
    };
  }

  componentDidMount = () => {
    if (this.props.previousUserInfo.preferred_region_id != null) {
      this.setState({
        preferred_region_id: this.props.previousUserInfo.preferred_region_id,
      });
    }
    if (this.props.previousUserInfo.preferred_location_id != null) {
      this.setState({
        preferred_location_id: this.props.previousUserInfo
          .preferred_location_id,
      });
    }
    // if (this.props.previousUserInfo.availability != null) {
    //   this.setState({
    //     availability: this.props.previousUserInfo.availability,
    //   });
    // }
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
    if (this.state.preferred_region_id.length == 0) {
      //   this.state.preferred_region_id.length == 0 ||
      //   this.state.preferred_location_id.length == 0 || // I think this field is labeled as optional so shouldn't be checked.
      //   this.state.availability == ""
      // ) {
      frontendError("Please fill out all fields.");
    } else if (this.state.agreementChecked == false) {
      frontendError(
        "Please agree to the Terms and Conditions and RLC Rescuer Policy."
      );
    } else {
      const { preferred_location_id, preferred_region_id } = this.state;
      this.props.setScreenForward( {...this.props.user, preferred_location_id, preferred_region_id }); 
      this.props.createUserForStorage({...this.props.user, preferred_location_id, preferred_region_id });
    }
  };

  // Single select, expects array of length 1
  onPreferredRegionChange = async (preferred_region_id) => {
    let included_locations = await fetch_locations_by_region(
      preferred_region_id[0]
    );
    this.setState({
      preferred_region_id: preferred_region_id,
      preferred_location_id: [],
      locations:
        included_locations === undefined || included_locations.length == 0
          ? []
          : included_locations,
    });
  };

  onPreferredLocationChange = (preferred_location_id) => {
    this.setState({ preferred_location_id: preferred_location_id });
  };

  // onPreferredTimesChange = (availability) => {
  //   this.setState({ availability });
  // };

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
                colors={Colors}
                selectedItems={this.state.preferred_region_id}
                items={this.state.regions}
                uniqueKey="id"
                displayKey="name"
                onSelectedItemsChange={this.onPreferredRegionChange}
                searchPlaceholderText="Search regions..."
                searchInputStyle={styles.input}
                modalWithSafeAreaView={true}
                submitButtonText="Select"
                confirmText="SAVE"
                value={this.state.preferred_region_id}
                styles={{
                  selectToggle: {
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    height: 40,
                  },
                  selectToggleText: {
                    fontSize: normalize(14),
                    color: Colors.black,
                  },
                }}
              />

              <Text style={styles.subHeading}>Preferred Location(s)</Text>
              <SectionedMultiSelect
                colors={Colors}
                selectedItems={this.state.preferred_location_id}
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
                value={this.state.preferred_location_id}
                styles={{
                  selectToggle: {
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    height: 40,
                  },
                  selectToggleText: {
                    fontSize: normalize(14),
                    color: Colors.black,
                  },
                }}
              />

              {/* <Text style={styles.subHeading}>Preferred Time(s)</Text>
              <SectionedMultiSelect
                hideSearch
                colors={Colors}
                selectedItems={this.state.availability}
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
                value={this.state.availability}
                styles={{
                  selectToggle: {
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    height: 40,
                  },
                  selectToggleText: {
                    fontSize: normalize(14),
                    color: Colors.black,
                  },
                }}
              /> */}
              <CheckBox
                wrapperStyle= {styles.checkBox}
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
    paddingVertical: "4%",
    marginBottom: 20,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    width: Sizes.width * (320/375),
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: "6.1%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "13.3%",
  },
  buttonText: {
    textAlign: "center",
    color: Colors.white,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  currentLocationButton: {
    paddingVertical: "4%",
    marginBottom: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    width: "80%",
    borderWidth: 2,
    borderColor: Colors.mainBlue,
  },
  currentLocationButtonContainer: {
    alignItems: "center",
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: Sizes.height * (50/812),
  },
  currentLocationButtonText: {
    textAlign: "center",
    color: Colors.mainBlue,
    fontWeight: "600",
  },
  input: {
    height: "5%",
    marginBottom: "2.4%",
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    color: Colors.black,
  },
  inputContainer: {
    paddingTop: "3%",
  },
  subHeading: {
    color: Colors.black,
    marginTop: 10,
    textAlign: "left",
    fontWeight: "600",
    opacity: 0.9,
    fontSize: normalize(14),
  },
  regionsubHeading: {
    color: Colors.black,
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
    color: Colors.black,
    lineHeight: 24,
  },
  checkBox: {
    width: "95%"
  }
});
