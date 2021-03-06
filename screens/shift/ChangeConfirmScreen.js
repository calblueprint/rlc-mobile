//radio buttons based on @source: https://dev.to/saadbashar/create-your-own-radio-button-component-in-react-native-easily-59il

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Header from "../../components/shift/Header";
import NavigationFooter from "../../navigation/NavigationFooter";
import { EventRegister } from "react-native-event-listeners";

import Sizes from "../../constants/Sizes";
import { normalize } from "../../utils/Normalize";
import Colors from "../../constants/Colors";
import { getRequest, postRequest } from "../../lib/requests";
import LocalStorage from "../../helpers/LocalStorage";

export default class ChangeConfirmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  async componentDidMount() {
    let user = await LocalStorage.getItem("user");
    this.setState({ user_id: user.userId });
  }

  signupForEventHandler = () => {
    this.reloadSearch();
    this.navigateToMain(() => {
      this.reloadEvents();
    });
  };

  reloadSearch = () => {
    EventRegister.emit("reloadSearch");
  };

  reloadEvents = () => {
    EventRegister.emit("reloadEvents");
  };

  navigateToMain = (callback) => {
    const { navigate } = this.props.navigation;
    const event_id = this.props.route.params.event_id ?? "";
    const change_type = this.props.route.params.change_type ?? "";
    if (change_type == "signup") {
      getRequest(
        `events/attend/${event_id}/attend`,
        (responseData) => {
          console.log(responseData);
          navigate("Dashboard");
          callback();
        },
        (error) => {
          console.log(error);
          console.log("errrrrr");
        }
      );
    }
    if (change_type == "withdraw") {
      postRequest(
        `events/cancel/${event_id}/attend`,
        (responseData) => {
          console.log(responseData);
          navigate("Dashboard");
          callback();
        },
        (error) => {
          console.log(error);
          console.log("errrrrr");
        },
        {
          volunteer_id: this.state.user_id,
          skip_volunteer_unassign_email: true,
        }
      );
    }
    navigate("Dashboard");
  };

  navigateToShift = () => {
    const { navigate } = this.props.navigation;
    navigate("Shift");
  };

  render() {
    const route = this.props.route;
    return (
      <View
        style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
      >
        <View style={{ flex: 1 }}>
          <Header
            centerTitle={route.params.title ?? "No Title"}
            onPressBack={this.signupForEventHandler}
            rightSide={false}
            actionTitle="Withdraw"
            onPressHandler={this.navigateToMain}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.overview}>{route.params.description ?? ""}</Text>
          {(route.params.hasQ ?? false) && (
            <Text style={{ ...styles.overview, fontWeight: "400" }}>
              {route.params.question ?? ""}
            </Text>
          )}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              {(route.params.options ?? "").map((item) => (
                <View key={item.key} style={styles.radioButtonContainer}>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => this.setState({ value: item.key })} // we set our value state to key
                  >
                    {this.state.value === item.key && (
                      <View style={styles.checkedCircle} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.radioText}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ flex: 5 }}></View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.signupForEventHandler}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 5,
    padding: 20,
  },
  overview: {
    fontWeight: "600",
    fontSize: normalize(16),
    flex: 1,
    paddingVertical: 0,
  },

  button: {
    backgroundColor: Colors.mainBlue,
    justifyContent: "center",
    margin: "0.5%",
    borderRadius: 5,
    width: "100%",
    height: Sizes.height * 0.06,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.buttonText,
    fontWeight: "600",
    fontSize: normalize(16),
    textTransform: "uppercase",
  },

  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
  },
  radioText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: normalize(14),
    paddingTop: 0,
  },
  circle: {
    height: Sizes.width * 0.06,
    width: Sizes.width * 0.06,
    borderRadius: Sizes.width * 0.06,
    borderWidth: Sizes.width * 0.005,
    borderColor: Colors.mainBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Sizes.width * 0.02,
  },
  checkedCircle: {
    width: Sizes.width * 0.04,
    height: Sizes.width * 0.04,
    borderRadius: Sizes.width * 0.04,
    backgroundColor: Colors.mainBlue,
  },
});
