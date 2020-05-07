import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { isTSTypeAliasDeclaration } from "@babel/types";

import Colors from "../../constants/Colors.js";
import { normalize } from "../../utils/Normalize.js";

import {
  availability_selectors,
  create_availability_static,
} from "../../helpers/AvailabilityHelpers.js";

import {
  fetch_locations_by_region,
  fetch_regions,
  fetch_locations,
} from "../../helpers/LocationHelpers.js";

export default class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preferred_region_id: [],
      preferred_location_id: [],
      selected_availabilities: [],
      new_availability: {},
      regions: [],
      locations: [],
      isFetching: true,
    };
  }

  componentDidMount() {
    if (this.props.getUserAttribute("preferred_region_id") != null) {
      this.setState({
        preferred_region_id: this.props.getUserAttribute("preferred_region_id"),
      });
    }
    if (this.props.getUserAttribute("preferred_location_id") != null) {
      this.setState({
        preferred_location_id: this.props.getUserAttribute(
          "preferred_location_id"
        ),
      });
    }
    if (this.props.getUserAttribute("availability") != null) {
      this.setState({
        availability: this.props.getUserAttribute("availability"),
      });
    }
    this._get_location_data();
  }

  _get_location_data = async () => {
    let regions = await fetch_regions();
    let locations = await fetch_locations();
    this.setState({
      regions: regions,
      locations: locations,
      isFetching: false,
    });
  };

  onPreferredRegionChange = async (preferred_region_id) => {
    let included_locations = await fetch_locations_by_region(
      preferred_region_id[0]
    );
    console.log(preferred_region_id)
    this.props.changeUserInfo("preferred_region_id", preferred_region_id)
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
    this.props.changeUserInfo("preferred_location_id", preferred_location_id)
    this.setState({ preferred_location_id: preferred_location_id });
  };

  onAvailabilityChange = (slotIds) => {
    /**
     * [ get new availability object for selected slots, update parent and self. ], 
     */
    let new_availability = create_availability_static(slotIds);
    this.props.changeAvailability(new_availability);
    this.setState({ selected_availabilities: slotIds, new_availability: new_availability });
  };

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <Text style={styles.heading}>Basic Information 🤓</Text>

        <Text style={styles.subHeading}>First Name</Text>
        <TextInput
          style={styles.input}
          defaultValue={this.props.getUserAttribute("firstname")}
          onChangeText={(text) => {
            this.props.changeUserInfo("firstname", text);
            this.props.enableSaveButton();
          }}
          returnKeyType="next"
          onSubmitEditing={() => this.lastNameInput.focus()}
          keyboardType="default"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.subHeading}>Last Name</Text>
        <TextInput
          style={styles.input}
          defaultValue={this.props.getUserAttribute("lastname")}
          onChangeText={(text) => {
            this.props.changeUserInfo("lastname", text);
            this.props.enableSaveButton();
          }}
          returnKeyType="next"
          ref={(input) => (this.lastNameInput = input)}
          onSubmitEditing={() => this.occupationInput.focus()}
          keyboardType="default"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.subHeading}>Occupation</Text>
        <TextInput
          style={styles.input}
          defaultValue={this.props.getUserAttribute("occupation")}
          onChangeText={(text) => {
            this.props.changeUserInfo("occupation", text);
            this.props.enableSaveButton();
          }}
          returnKeyType="done"
          ref={(input) => (this.occupationInput = input)}
          keyboardType="default"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.heading}>Contact Information 📱</Text>
        {/* I suggest we embed this in some sort of interactive info button; like a question mark icon  */}
        <Text style={styles.subtext}>
          RLC needs your complete address in order to successfully place you in
          the right area.
        </Text>

        <Text style={styles.subHeading}>Phone Number</Text>
        <TextInput
          style={styles.input}
          defaultValue={this.props.getUserAttribute("telephone")}
          onChangeText={(text) => {
            this.props.changeUserInfo("telephone", text);
            this.props.enableSaveButton();
          }}
          returnKeyType="next"
          onSubmitEditing={() => this.addressA.focus()}
          keyboardType="phone-pad"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.subHeading}>Address (Line 1)</Text>
        <TextInput
          style={styles.input}
          defaultValue={this.props.getUserAttribute("address")}
          onChangeText={(text) => {
            this.props.changeUserInfo("address", text);
            this.props.enableSaveButton();
          }}
          returnKeyType="next"
          ref={(input) => (this.addressA = input)}
          onSubmitEditing={() => this.addressB.focus()}
          keyboardType="default"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.subHeading}>Address (Line 2)</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          returnKeyType="next"
          ref={(input) => (this.addressB = input)}
          onSubmitEditing={() => this.cityInput.focus()}
          keyboardType="default"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.subHeading}>City</Text>
        <TextInput
          style={styles.input}
          defaultValue={this.props.getUserAttribute("city")}
          onChangeText={(text) => {
            this.props.changeUserInfo("city", text);
            this.props.enableSaveButton();
          }}
          returnKeyType="next"
          ref={(input) => (this.cityInput = input)}
          onSubmitEditing={() => this.stateInput.focus()}
          keyboardType="default"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.subHeading}>State</Text>
        <TextInput
          style={styles.input}
          defaultValue={this.props.getUserAttribute("state")}
          onChangeText={(text) => {
            this.props.changeUserInfo("state", text);
            this.props.enableSaveButton();
          }}
          returnKeyType="next"
          ref={(input) => (this.stateInput = input)}
          onSubmitEditing={() => this.zipInput.focus()}
          keyboardType="default"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.subHeading}>Zip Code</Text>
        <TextInput
          style={styles.input}
          defaultValue={this.props.getUserAttribute("zipCode")}
          onChangeText={(text) => {
            this.props.changeUserInfo("zipCode", text);
            this.props.enableSaveButton();
          }}
          returnKeyType="done"
          ref={(input) => (this.zipInput = input)}
          keyboardType="number-pad"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        {/* Account Details */}
        <Text style={styles.heading}>Account Details ⚙️</Text>

        <Text style={styles.subHeading}>Email</Text>
        <TextInput
          defaultValue={this.props.getUserAttribute("email")}
          onChangeText={(text) => {
            this.props.changeUserInfo("email", text);
            this.props.enableSaveButton();
          }}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          autoCorrect={false}
        ></TextInput>

        <Text style={styles.subHeading}>Password</Text>
        <TextInput
          inlineImageLeft="lock"
          onChangeText={(text) => {
            this.props.changeUserInfo("password", text);
            this.props.enableSaveButton();
          }}
          secureTextEntry
          style={styles.input}
          returnKeyType="go"
        ></TextInput>

        <View style={{ width: 150, height: 50 }}>
          <TouchableOpacity style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Reset password</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heading}>Event Preferences 🍎</Text>

        <Text style={styles.subHeading}>Preferred Region</Text>
          <SectionedMultiSelect
            single
            colors={{ primary: Colors.mainBlue }}
            selectedItems={this.state.preferred_region_id}
            items={this.state.regions}
            uniqueKey="id"
            displayKey="name"
            onSelectedItemsChange={(preferred_region_id) => {
              this.onPreferredRegionChange(preferred_region_id);
              this.props.changeUserInfo("preferred_region_id", preferred_region_id);
              this.props.enableSaveButton();
            }}
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
                color: "#333333",
                marginTop: 20,
              },
            }}
          />

          <Text style={styles.subHeading}>Preferred Locations (Optional)</Text>
          <SectionedMultiSelect
            colors={{ primary: Colors.mainBlue }}
            selectedItems={this.state.preferred_location_id}
            items={this.state.locations}
            uniqueKey="id"
            displayKey="name"
            onSelectedItemsChange={(preferred_location_id) => {
              this.onPreferredLocationChange(preferred_location_id);
              this.props.changeUserInfo(
                "preferred_location_id",
                preferred_location_id
              );
              this.props.enableSaveButton();
            }}
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
                color: "#333333",
                marginTop: 20,
              },
            }}
          />

        <Text style={styles.subHeading}>Preferred Times (Optional)</Text>
        <SectionedMultiSelect
          hideSearch
          colors={Colors}
          selectedItems={this.state.selected_availabilities}
          items={availability_selectors}
          uniqueKey="id"
          expandDropDowns={true}
          onSelectedItemsChange={(slotIds) => {
            this.onAvailabilityChange(slotIds);
            this.props.enableSaveButton();
          }}
          subKey="times"
          showChips={false}
          searchInputStyle={styles.input}
          modalWithSafeAreaView={true}
          submitButtonText="Select"
          confirmText="SAVE"
          styles={{
            selectToggle: {
              borderBottomWidth: 1,
              marginBottom: 20,
              height: 40,
            },
            selectToggleText: {
              fontSize: normalize(14),
              color: "#333333",
              marginTop: 20,
            },
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 20,
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    color: "#000000",
  },
  heading: {
    color: "#000000",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
    fontWeight: "600",
    opacity: 0.9,
    fontSize: normalize(20),
  },
  subHeading: {
    color: "#000000",
    marginTop: 10,
    textAlign: "left",
    fontWeight: "600",
    opacity: 0.9,
    fontSize: normalize(14),
  },
  subtext: {
    color: "#757575",
    marginTop: 5,
    marginBottom: 5,
    textAlign: "left",
    fontWeight: "normal",
    fontStyle: "italic",
    opacity: 0.85,
    fontSize: normalize(14),
  },
  button: {
    backgroundColor: Colors.mainBlue,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    width: 250,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: normalize(14),
    color: "#2e78b7",
    fontWeight: "600",
  },
});
