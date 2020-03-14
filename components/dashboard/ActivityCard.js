import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default class ActivityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      event : this.props.event,
    }
  }

  render() {
      return ( //Return loaded card
        <TouchableOpacity
          style={styles.card}
          // onPress={() => this.props.onPressHandler.bind(this, this.state.event.eventId)}
        >
          <Text style={styles.location}>📍 {this.state.event.address}</Text>
  
          <Text style={styles.name}>{this.state.event.title}</Text>
  
          <Text style={styles.time}>{this.state.event.starting_hour}</Text>
          <View style={styles.details}>
            <View>
              <Text style={styles.smallGreyText}>Weight</Text>
              <Text style={styles.smallBlackText}>{/*{this.props.weight}*/} FILLER </Text>
            </View>
            <View>
              <Text style={styles.smallGreyText}># of Pickups</Text>
              <Text style={styles.smallBlackText}>{/*{this.props.numpickups}*/} FILLER </Text>
            </View>
            <View>
              <Text style={styles.smallGreyText}>Spots Open</Text>
      <Text style={styles.smallBlackText}>{/*{this.props.spotsOpen} */} FILLER </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
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
