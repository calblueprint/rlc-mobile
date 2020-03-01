import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

function ActivityCard(data) {

  // onPressShiftHandler = () => {
  //   this.props.onPressHandler();
  // };

  // const shiftData = data.item;

  //To be replaced with real data
  const shiftData = {
    location : "Washington Square Park",
    name : "Washington Arch (TA114)",
    time: "1:00 to 2:30 PM",
    weight: "25 to 45 lbs",
    numpickups : "3",
    spotsOpen : "1 of 3"
  }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          this.props.onPressHandler();
        }}
      >
        <Text style={styles.location}>📍 {shiftData.location}</Text>

        <Text style={styles.name}>{shiftData.name}</Text>

        <Text style={styles.time}>{shiftData.time}</Text>
        <View style={styles.details}>
          <View>
            <Text style={styles.smallGreyText}>Weight</Text>
            <Text style={styles.smallBlackText}>{shiftData.weight}</Text>
          </View>
          <View>
            <Text style={styles.smallGreyText}># of Pickups</Text>
            <Text style={styles.smallBlackText}>{shiftData.numpickups}</Text>
          </View>
          <View>
            <Text style={styles.smallGreyText}>Spots Open</Text>
            <Text style={styles.smallBlackText}>{shiftData.spotsOpen}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: "8%",
    width: "84%",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  location: {
    color: "#9E9E9E",
    marginTop: 20,
    marginLeft: 14,
    textAlign: "left",
    fontWeight: "500",
    opacity: 1,
    fontSize: 14
  },
  name: {
    color: "#4d95d2",
    margin: 7,
    marginLeft: 14,
    textAlign: "left",
    fontWeight: "700",
    opacity: 0.9,
    fontSize: 20
  },
  time: {
    color: "#9E9E9E",
    marginLeft: 14,
    textAlign: "left",
    fontWeight: "500",
    opacity: 1,
    fontSize: 14
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 14,
    marginTop: 16,
    marginBottom: 18
  },
  smallGreyText: {
    color: "#9E9E9E",
    textAlign: "left",
    fontWeight: "500",
    opacity: 1,
    fontSize: 12,
    marginBottom: 5
  },
  smallBlackText: {
    color: "#000000",
    textAlign: "left",
    fontWeight: "500",
    opacity: 1,
    fontSize: 12
  }
});

export default ActivityCard;