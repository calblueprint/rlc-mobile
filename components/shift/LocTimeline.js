import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import Sizes from "../../constants/Sizes";

import Colors from "../../constants/Colors";
import { normalize } from "react-native-elements";
export default class ParticipantCard1 extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRow(location, index) {
    const locations = this.props.markers
    return (
      <View style={{ ...styles.timelineContainer }}>
        <View style={{ ...styles.timelineComponent }}>
          {location.arrived ? <View style={{ ...styles.circle, ...styles.filledCircle }} /> : <View style={{ ...styles.circle, ...styles.outCircle }} />}
          {index !== locations.length - 1 ? <View style={styles.separator} /> : <View />}
        </View>
        <View style={{
          ...styles.timelineComponent,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
          <Text style={styles.title}> {location.title}</Text>
          <Text style={styles.description}> {location.description}</Text>
        </View>

      </View>
    )
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.markers}
        renderItem={({ item, index }) => this.renderRow(item, index)}
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "10%",
    backgroundColor: "white"
  },


  timelineContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: "row",
  },
  timelineComponent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    paddingRight: "15%",
  },
  circle: {
    height: Sizes.width * 0.04,
    width: Sizes.width * 0.04,
    borderRadius: Sizes.width * 0.04,
  },
  outCircle: {
    borderWidth: Sizes.width * 0.005,
    borderColor: Colors.green,
  },
  filledCircle: {
    backgroundColor: Colors.green,
  },
  title: {
    color: Colors.regularText,
    fontWeight: "600",
    fontSize: normalize(14),
    paddingBottom: "3%",
  },
  description: {
    color: Colors.regularText,
    fontSize: normalize(12),
    paddingLeft: "3%"
  },
  separator: {
    height: Sizes.height * 0.1,
    borderLeftWidth: 2,
    borderLeftColor: Colors.green,
  }


});
