import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";

// Animation Libraries
import { TabView, SceneMap } from "react-native-tab-view";
import Animated from "react-native-reanimated";


// Components
import ActivityCard from "../dashboard/ActivityCard.js";
import { APIRoutes } from '../../config/routes.js'
import { getRequest } from '../../lib/requests.js'
import LocalStorage from "../../helpers/LocalStorage.js";

import TimeTab from "./timeTab.js";


import { normalize } from "../../utils/Normalize";

//time
const FirstRoute = () => (
  <View style={{ flex: 1 }}>
    <TimeTab />
  </View>
);

//location
const SecondRoute = () => (
  <View>

    <View>

    </View>
    <View>

    </View>
    <View>

    </View>

  </View>
);

export default class TimeOrLoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Time", num: 0 },
        { key: "second", title: "Location", num: 0 }
      ]
    };
  }

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 56 : 117
                )
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 165 : 117
                )
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 219 : 117
                )
              })
            )
          );
          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.View style={{ ...styles.tabCont, borderBottomColor: color, }}>
                <Animated.Text style={{ ...styles.tabText, color: color }}>{route.title} ({route.num})</Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        swipeEnabled={false}
      />
    );
  }
}

const styles = StyleSheet.create({

  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabCont: {
    width: "100%",
    alignContent: "center",
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: normalize(16),
    margin: "10%",
    alignSelf: "center"
  }



});
