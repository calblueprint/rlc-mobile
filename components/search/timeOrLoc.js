import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

// Animation Libraries
import { TabView, SceneMap } from "react-native-tab-view";
import Animated from "react-native-reanimated";

// Components
import ActivityCard from "../dashboard/ActivityCard.js";
import { APIRoutes } from "../../config/routes.js";
import { getRequest } from "../../lib/requests.js";
import LocalStorage from "../../helpers/LocalStorage.js";

import TimeTab from "./timeTab.js";
import LocTab from "./locTab.js";

import { normalize } from "../../utils/Normalize";

export default class TimeOrLoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Time" },
        { key: "second", title: "Location" },
      ],
    };
  }

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 56 : 117
                ),
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 165 : 117
                ),
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 219 : 117
                ),
              })
            )
          );
          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.View
                style={{ ...styles.tabCont, borderBottomColor: color }}
              >
                <Animated.Text style={{ ...styles.tabText, color: color }}>
                  {route.title} ({route.key === 'first' ? this.props.numTimes : this.props.numLocs})
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={{ flex: 1 }}>
            <TimeTab
              updateParentOneTime={this.props.updateOneTime}
              updateParentAll={this.props.updateSelectAll}
              selAllVal={this.props.selAllVal}
              selectedDay={this.props.selectedDay}
              updateSelDay={this.props.updateSelDay}
              dayops={this.props.dayops}
              timeops={this.props.timeops}
              numTimes={this.state.numTimes}
            />
          </View>
        );
      case "second":
        return (
          <View style={{ flex: 1 }}>
            <LocTab
              locOptions={this.props.locOptions}
              updateLoc={this.props.updateLoc}
              searchVal={this.props.searchVal}
              updateSearch={this.props.updateSearch}
              numLocs={this.state.numLocs}
              getCurrLoc={this.props.getCurrLoc}
              fetchingLoc={this.props.fetchingLoc}
            />
          </View>
        );
    }
  };

  _renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene}
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
    alignSelf: "center",
  },
});
