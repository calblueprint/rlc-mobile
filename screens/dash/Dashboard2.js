import React, { Component } from "../../node_modules/react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";

// Components
import EventsList from "../../components/dashboard/EventsList2.js";
import ActivityCard from "../../components/dashboard/ActivityCard";

// Utils
import { normalize } from "../../utils/Normalize.js";
import LocalStorage from "../../helpers/LocalStorage";

import Sizes from "../../constants/Sizes.js";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentEvent: {},
      requestLoaded: false
    }
  }

  async componentDidMount() {
    let user = await LocalStorage.getItem('user');
  }

  // _fetchCurrentEvent () {}

  navigateToShift = (eventData) => {
    const { navigate } = this.props.navigation;
    navigate("Shift", eventData);
  };

  navigateToProfile = () => {
    const { navigate } = this.props.navigation;
    navigate("Profile");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.currentEvent}>
          <View style={styles.slideStructure}>
            <Text style={styles.inProgress}>• In Progress</Text>
            <ActivityCard 
              event = {this.state.currentEvent}
              onPressHandler={this.navigateToShift}
            />
          </View>
        </View>
        <EventsList navigation = {this.props.navigation} />
      </View>
    );
  }
}

Dashboard.navigationOptions = {
  title: "Home"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Sizes.width
  },
  currentEvent: {
    backgroundColor: "#EEEEEE",
    height: "30%"
  },
  subText: {
    color: "#000000",
    fontStyle: "italic",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "normal",
    marginTop: "27.5%",
    opacity: 0.85,
    fontSize: normalize(16)
  },
  eventsList: {
    flex: 1,
    height: "100%"
  },
  horizontalView: {
    height: "100%",
    marginTop: "10%"
  },
  scrollWrapper: {
    height: "90%"
  },
  slideStructure: {
    height: "100%",
    marginTop: "13%",
    width: "100%"
  },
  inProgress: {
    color: "#7CB342",
    fontStyle: "italic",
    fontWeight: "700",
    textAlign: "center",
    opacity: 0.9,
    fontSize: normalize(16),
    marginBottom: "2.6%"
  },
  needsAttention: {
    color: "#E64A19",
    fontStyle: "italic",
    fontWeight: "700",
    textAlign: "center",
    opacity: 0.9,
    fontSize: normalize(16),
    marginBottom: "2.6%"
  }
});
