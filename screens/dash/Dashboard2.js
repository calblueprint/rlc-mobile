import React, { Component } from "../../node_modules/react";
import { StyleSheet, View, Text } from "react-native";

// Components
import EventsList from "../../components/dashboard/EventsList2.js";
import ActivityCard from "../../components/dashboard/ActivityCard";

// Utils
import { normalize } from "../../utils/Normalize.js";
import LocalStorage from "../../helpers/LocalStorage";

import Styles from "../../constants/Styles";
import Sizes from "../../constants/Sizes.js";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentEvent: {},
      requestLoaded: false,
    };
  }

  async componentDidMount() {
    let user = await LocalStorage.getNonNullItem("user");
  }

  navigateToShift = (eventData) => {
    const { navigate } = this.props.navigation;
    navigate("Shift", eventData);
  };

  navigateToProfile = () => {
    const { navigate } = this.props.navigation;
    navigate("Profile");
  };

  navigateToSearch = () => {
    this.props.navigation.jumpTo("Search");
  };

  setCurrentEvent = (event) => {
    this.setState({ currentEvent: event });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={Styles.title}> Home </Text>
        </View>
        <View style={styles.currentEvent}>
          <View style={styles.slideStructure}>
            <Text style={styles.inProgress}>• In Progress</Text>
            {Object.keys(this.state.currentEvent).length === 0 ? (
              <Text style={styles.subText}>No events in progress 🐥</Text>
            ) : (
              <ActivityCard
                key={this.state.currentEvent.id}
                event={this.state.currentEvent}
                navigation={this.props.navigation}
              />
            )}
          </View>
        </View>
        <EventsList
          navigation={this.props.navigation}
          toSearch={this.navigateToSearch}
          setCurrentEvent={this.setCurrentEvent}
        />
      </View>
    );
  }
}

Dashboard.navigationOptions = {
  title: "Home",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: Sizes.width,
    paddingTop: "10%",
  },
  header: {
    marginHorizontal: "10%",
  },
  currentEvent: {
    backgroundColor: "#EEEEEE",
    height: "35%",
  },
  subText: {
    color: "#757575",
    fontStyle: "italic",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "normal",
    marginTop: "17%",
    opacity: 0.85,
    fontSize: normalize(16),
  },
  eventsList: {
    flex: 1,
    height: "100%",
  },
  horizontalView: {
    height: "100%",
    marginTop: "10%",
  },
  scrollWrapper: {
    height: "90%",
  },
  slideStructure: {
    height: "100%",
    marginTop: "5%",
    width: "100%",
  },
  inProgress: {
    color: "#7CB342",
    fontStyle: "italic",
    fontWeight: "700",
    textAlign: "center",
    opacity: 0.9,
    fontSize: normalize(16),
    marginBottom: "2.6%",
  },
  needsAttention: {
    color: "#E64A19",
    fontStyle: "italic",
    fontWeight: "700",
    textAlign: "center",
    opacity: 0.9,
    fontSize: normalize(16),
    marginBottom: "2.6%",
  },
});