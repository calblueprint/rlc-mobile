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
import LocTab from "./locTab.js";


import { normalize } from "../../utils/Normalize";

export default class TimeOrLoc extends Component {
  constructor(props) {
    super(props);
    // this.addTime = this.addTime.bind(this);
    // this.addLoc = this.addLoc.bind(this);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Time" },
        { key: "second", title: "Location" }
      ]
    };
  }

  //time
  FirstRoute = () => (
    <View style={{ flex: 1 }}>
      <TimeTab updateParentOneTime={this.props.updateOneTime} updateParentAll={this.props.updateSelectAll} selAllVal={this.state.selAllVal}
        selectedDay={this.props.selectedDay} updateSelDay={this.props.updateSelDay}
        dayops={this.props.dayops} timeops={this.props.timeops} />
    </View>
  );

  //location
  SecondRoute = () => (
    <View style={{ flex: 1 }}>
      <LocTab />
    </View>
  );


  // addTime = (numAdd, selAll) => {
  //   this.state.routes.map((item, id) => {
  //     if (item.title === "Time") {
  //       if (selAll) {
  //         this.setState({ ...item.num = numAdd });
  //       } else {
  //         this.setState(prevState => {
  //           item.num = numAdd + prevState.routes[id].num;
  //           if (item.num < 0) {
  //             item.num = 0;
  //           }
  //           return item.num
  //         });
  //       }
  //     }
  //   })
  // }

  // addLoc = (totalNum) => {
  //   this.state.routes.map((item, id) => {
  //     if (item.title === "Location") {
  //       this.setState({ ...item.num = totalNum });
  //     }
  //   })
  // }

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
                <Animated.Text style={{ ...styles.tabText, color: color }}>{route.title} ()</Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  _renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute
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
