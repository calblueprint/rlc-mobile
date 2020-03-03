import React, { Component } from "../../node_modules/react";
import { StyleSheet, View, ScrollView, FlatList, Text } from "react-native";

import EventsList from "../../components/dashboard/EventsList2.js";
import ActivityCard from "../../components/dashboard/ActivityCard";

import Sizes from "../../constants/Sizes.js";

//Styling functions
import { normalize } from "../../utils/Normalize.js";

const fakeData = [{
  location: "Washington Square Park",
  status: "",
  name: "Washington Arch (TA114)",
  time: "1:00 to 2:30 PM",
  weight: "25 to 45 lbs",
  numpickups: "3",
  spotsOpen: "1 of 3",
},
{
  location: "Washington Square Park",
  status: "",
  name: "Washington Arch (TA114)",
  time: "1:00 to 2:30 PM",
  weight: "25 to 45 lbs",
  numpickups: "3",
  spotsOpen: "1 of 3",
},
{
  location: "Washington Square Park",
  status: "",
  name: "Washington Arch (TA114)",
  time: "1:00 to 2:30 PM",
  weight: "25 to 45 lbs",
  numpickups: "3",
  spotsOpen: "1 of 3",
}]

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    state: {
      upcomingData: fakeData;
      completedData: fakeData;
      inProgressData: fakeData
    }
  }

  fetchFromAsyncStorage() {
    // this.upcomingData/completedData/inProgressData = (...)
  }

  navigateToShift = () => {
    const { navigate } = this.props.navigation;
    navigate("Shift");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.currentEvent}>
          <ScrollView
            style={styles.horizontalView}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            snapToAlignment={"center"}
            showsVerticalScrollIndicator={false}
            pagingEnabled={true}
            directionalLockEnabled={true}
            automaticallyAdjustContentInsets={false}
          >
            <View style={styles.slideStructure}>
              <Text style={styles.inProgress}>• In Progress</Text>
              <ActivityCard
                location={"📍 Washington Square Park"}
                name={"Washington Arch (TA114)"}
                time={"1:00 to 2:30 PM"}
                weight={"25 to 45 lbs"}
                numpickups={"3"}
                spotsOpen={"1 of 3"}
                onPressHandler={this.navigateToShift}
              />
            </View>

            <View style={styles.slideStructure}>
              <Text style={styles.needsAttention}>• Needs Attention</Text>
              <ActivityCard
                location={"📍 Korea Town NYC"}
                name={"Kimbachi Tan (SA457)"}
                time={"5:00 to 6:30 PM"}
                weight={"25 to 45 lbs"}
                numpickups={"3"}
                spotsOpen={"1 of 3"}
              />
            </View>
          </ScrollView>
        </View>

        {/* <EventsList upcomingShifts={this.state.upcomingData} completedShifts={this.state.completedData}/> */}
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
    width: Sizes.width,
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
    width: 400,
    height: 400
  },
  inProgress: {
    color: "#7CB342",
    fontStyle: "italic",
    fontWeight: "700",
    textAlign: "center",
    opacity: 0.9,
    fontSize: normalize(16),
    marginBottom: 10
  },
  needsAttention: {
    color: "#E64A19",
    fontStyle: "italic",
    fontWeight: "700",
    textAlign: "center",
    opacity: 0.9,
    fontSize: normalize(16),
    marginBottom: 10
  }
});
