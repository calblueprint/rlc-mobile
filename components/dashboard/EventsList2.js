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
import ActivityCard from "../../components/dashboard/ActivityCard.js";
import APIRoutes from '../../config/routes.js'
import getRequest from '../../lib/requests.js'
import LocalStorage from "../../helpers/LocalStorage.js";

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
    <ScrollView style={{ height: "100%" }}>
      <Text style={styles.heading}>Sunday, June 19, 2019</Text>
      <ActivityCard
        location={"📍 Union Square"}
        name={"Union Square (US014)"}
        time={"8:15 to 9:15 PM"}
        weight={"10 to 45 lbs"}
        numpickups={"2"}
        spotsOpen={"1 of 2"}
      />
      <ActivityCard
        location={"📍 Greenwich Village"}
        name={"Greenwich Village (GW007)"}
        time={"4:15 to 6:15 PM"}
        weight={"10 to 45 lbs"}
        numpickups={"2"}
        spotsOpen={"1 of 2"}
      />
      <Text style={styles.heading}>Monday, June 20, 2019</Text>
      <ActivityCard
        location={"📍 Williamsburg"}
        name={"South Side Mission (WB001)"}
        time={"10:30 to 11:30 AM"}
        weight={"10 to 45 lbs"}
        numpickups={"1"}
        spotsOpen={"2 of 4"}
      />
    </ScrollView>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
    <ScrollView style={{ height: "100%" }}>
      <Text style={styles.heading}>Sunday, June 19, 2019</Text>
      <ActivityCard
        location={"📍 Home"}
        name={"Union Square (US014)"}
        time={"8:15 to 9:15 AM"}
        weight={"10 to 45 lbs"}
        numpickups={"2"}
        spotsOpen={"1 of 2"}
      />
    </ScrollView>
  </View>
);

export default class EventsList2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      user_id: '',
      events: [],
      routes: [
        { key: "first", title: "Upcoming" },
        { key: "second", title: "Completed" }
      ]
    };
  }

  async componentDidMount() {
    try {
      let user = await LocalStorage.getUser();
      this.setState({ user_id: user.id });
    } catch(err) {
      console.error(err)
      this.props.navigation.navigate("Login")
    }
    // this._fetchEvents();
  }

  // Fetch function; not sure if this works yet
  // TODO: @Johnathan / @Suhas, get fetch events to work 
  _fetchEvents = () => {
    return getRequest(
      APIRoutes.getEventsPath(this.state.user_id, "attended"),
      (responseData) => {
        this.setState({ events: responseData });
      },
      (error) => {
        alert(error)
        console.log(error)
      }
    );
  };

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
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
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
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#38A5DB",
    paddingVertical: 15,
    borderRadius: 5,
    width: 250
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    height: 50
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  scene: {
    flex: 1
  },
  subText: {
    color: "#757575",
    fontStyle: "italic",

    textAlign: "center",
    justifyContent: "center",
    fontWeight: "normal",
    marginTop: "0%",

    opacity: 0.85,
    fontSize: 16
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: "auto"
  },
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 10
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  heading: {
    color: "#000000",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "8%",
    textAlign: "left",
    fontWeight: "600",
    opacity: 0.7,
    fontSize: 16
  }
});
