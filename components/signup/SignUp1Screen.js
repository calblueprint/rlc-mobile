import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { frontendError } from "../../lib/alerts";
import StepsTimeline from "../../components/StepsTimeline";
import DatePicker from "react-native-datepicker";

import Colors from "../../constants/Colors";
import { normalize } from "../../utils/Normalize";

export default class SignUp1Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      birthday: "",
      birth_month: "",
      telephone: "",
      user: {},
    };
  }

  // //Setup User Payload
  // setupParams = () => {
  //   this.setState({
  //     user: { 
  //       ...this.props.user, 
  //       firstname: this.state.firstname ,
  //       lastname: this.state.lastname,
  //       birth_month: this.state.birth_month,
  //       telephone: this.state.telephone,
  //     },
  //   });
  // };

  /*Checks conditions before transitioning to next screen:
   * 1. all fields are filled out and not empty.
   */
  checkValidNext = () => {
    if (
      this.state.firstname == "" ||
      this.state.lastname == "" ||
      this.state.birthday == "" ||
      this.state.telephone == ""
    ) {
      frontendError("Please fill out all fields.");
    } else if (this.state.telephone.match(/[a-z]/i)) {
      frontendError("Invalid telephone number.");
    } else if (!this.isOverEighteen()) {
      frontendError("You must at least 18 years old to be a RLC volunteer.");
    } else {
      // this.setupParams();
      const { firstname, lastname, birth_month, telephone } = this.state;
      this.props.setScreenForward( { ...this.props.user, firstname, lastname, birth_month, telephone} );
    }
  };

  isOverEighteen = () => {
    var today = new Date();
    var birthdayDate = new Date(this.state.birthday);
    return (today - birthdayDate) / (1000 * 60 * 60 * 24) >= 6570;
  };

  gotoPrevStep = () => {
    this.props.setScreenBackward(this.state.user);
  };

  //Set state var birthday as today"s date.
  componentDidMount = () => {
    this.getToday();
    if (this.props.previousUserInfo.firstname != null) {
      this.setState({ firstname: this.props.previousUserInfo.firstname });
    }
    if (this.props.previousUserInfo.lastname != null) {
      this.setState({ lastname: this.props.previousUserInfo.lastname });
    }
    if (this.props.previousUserInfo.birthday != null) {
      this.setState({ birthday: this.props.previousUserInfo.birthday });
    }
    if (this.props.previousUserInfo.birth_month != null) {
      this.setState({ birth_month: this.props.previousUserInfo.birth_month });
    }
    if (this.props.previousUserInfo.telephone != null) {
      this.setState({ telephone: this.props.previousUserInfo.telephone });
    }
  };

  //Sets state var birthday as today"s date.
  getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "/" + mm + "/" + dd;
    this.setState({ birthday: today });
    this.setState({ birth_month: monthNames[mm - 1] });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StepsTimeline currentPosition={0} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.heading}>
            We're excited to have you join the team! First off, tell us a little
            bit about yourself!
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.subHeading}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder={"Jane"}
              onChangeText={(text) => this.setState({ firstname: text })}
              returnKeyType={"next"}
              onSubmitEditing={() => this.lastNameInput.focus()}
              value={this.state.firstname}
            ></TextInput>
            <Text style={styles.subHeading}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder={"Doe"}
              onChangeText={(text) => this.setState({ lastname: text })}
              returnKeyType={"next"}
              ref={(input) => {
                this.lastNameInput = input;
              }}
              value={this.state.lastname}
            ></TextInput>
            <Text style={styles.subHeading}>Birthday</Text>
            <DatePicker
              format="YYYY-MM-DD"
              date={this.state.birthday}
              style={styles.datePicker}
              onDateChange={(date) => {
                this.setState({ birthday: date });
                this.setState({
                  birth_month: monthNames[parseInt(date.substr(5, 2)) - 1],
                });
              }}
              confirmBtnText={"Confirm"}
              cancelBtnText={"Cancel"}
              value={this.state.birthday}
            />
            <Text style={styles.subHeading}>Mobile Phone Number</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder={"(123)-456-7890"}
              onChangeText={(text) => this.setState({ telephone: text })}
              returnKeyType={"next"}
              value={this.state.telephone}
            ></TextInput>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.checkValidNext}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    color: "#333333",
  },
  datePicker: {
    marginBottom: 20,
    marginTop: 5,
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
