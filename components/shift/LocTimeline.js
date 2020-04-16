import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Timeline from "react-native-timeline-listview";

import Sizes from "../../constants/Sizes";

import Colors from "../../constants/Colors";
export default class ParticipantCard1 extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRow(puppy) {
    return (
      <View style={{ ...styles.timelineContainer, flexDirection: "column" }}>
        <View style={styles.timelineContainer}>
          <View style={{ ...styles.circle, ...styles.filledCircle }} />
          <Text style={{}}> an object</Text>
        </View>

        <View style={styles.separator} />
      </View>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles.container}
          data={this.props.markers}
          renderItem={({ item: puppy }) => this.renderRow(puppy)}
        />

        <Timeline
          style={styles.list}
          data={this.props.markers}
          circleSize={15}
          circleColor="#79B830"
          innerCircle={"dot"}
          dotColor="#79B830"
          lineColor="#79B830"
          titleStyle={{
            color: "#4A4A4A",
            fontWeight: "600",
            fontSize: 17
          }}
          descriptionStyle={{
            color: "#4A4A4A",
            fontSize: 15,
            selectable: true
          }}
          showTime={false}
          detailContainerStyle={{ marginTop: -12 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white"
  },
  list: {
    flex: 1,
    marginTop: 20
  },



  timelineContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    padding: "10%"
  },
  circle: {
    height: Sizes.width * 0.04,
    width: Sizes.width * 0.04,
    borderRadius: Sizes.width * 0.04,
  },
  outCircle: {
    borderWidth: Sizes.width * 0.005,
    borderColor: Colors.mainBlue,
  },
  filledCircle: {
    backgroundColor: Colors.mainBlue,
  },
  text: {

  },
  separator: {
    height: 10,
    borderLeftWidth: 2,
    borderLeftColor: Colors.mainBlue
  }


});
