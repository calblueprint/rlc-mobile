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

// Utils
import Sizes from "../../constants/Sizes"
import { normalize } from "../../utils/Normalize.js";
import {APIRoutes} from '../../config/routes.js'
import {getRequest} from '../../lib/requests.js'
import LocalStorage from "../../helpers/LocalStorage.js";

//Upcoming Events expects { onPressHandler, requestLoaded, upcomingEvents } 
class UpcomingEventsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upcomingEvents : props.upcomingEvents
    }
  }
  render() {
    if (this.state.upcomingEvents === undefined || this.state.upcomingEvents.length == 0) {
      return (
        <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
          <View style={styles.infoContainer}>
            <Text style={styles.subText}>Oh no! You have no upcoming shifts.</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Up for Shift</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>    
      );
    } else {
      return (
        <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
        <ScrollView style={{ height: "100%" }}>
          <Text style={styles.heading}>Sunday, June 19, 2019</Text>
          {this.props.events.map((event) => {
            <ActivityCard
              event = {this.state}
              onPressHandler = {this.props.onPressHandler}
            />
          })}
          <Text style={styles.heading}>Monday, June 20, 2019</Text>
        </ScrollView>
      </View>  
      );
    }
  }
}

//Attended Events expects { onPressHandler, requestLoaded, attendedEvents }
class AttendedEventsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attendedEvents : props.attendedEvents
    }
  }

  render() {
    if (this.state.attendedEvents === undefined || this.state.attendedEvents.length == 0) {
      return ( 
        <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
          <View style={styles.infoContainer}>
            <Text style={styles.subText}>
              Did you know?{"\n"}
              RLC has rescued over 1.7 million{"\n"}
              pounds of food! Sign up for an event{"\n"}
              and be a part of the movement!
            </Text>
      
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Up for Shift</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.scene, { backgroundColor: "#FFFFFF" }]}>
        <ScrollView style={{ height: "100%" }}>
          <Text style={styles.heading}>Sunday, June 19, 2019</Text>
          {this.props.events.map((event) => {
            <ActivityCard
              event = {this.state}
              onPressHandler = {this.props.onPressHandler}
            />
          })}    
          </ScrollView>
        </View>
      );
    }
  }
}

export default class EventsList2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      user_id: '',
      isFetching : true,
      attendedEvents: [],
      upcomingEvents: [],
      routes: [
        { key: "first", title: "Upcoming" },
        { key: "second", title: "Attended" }
      ]
    };
  }

  async componentDidMount() {
    try {
      let user = await LocalStorage.getItem('user');
      this.setState({ user_id: user.id });
    } catch(err) {
      console.error(err)
      this.props.navigation.navigate("Login")
    }
    this._fetchEvents();
  }

  // Fetch function; not sure if this works yet
  // TODO: @Johnathan / @Suhas, get fetch events to work 
  _fetchEvents = () => {
    getRequest(
      APIRoutes.getEventsPath(this.state.user_id, "attended"),
      (fetchedAttended) => {
        LocalStorage.storeItem('attended_events', fetchedAttended);
        this.setState((prevState)=>{
          return {...prevState, attendedEvents: fetchedAttended }
        });
      },
      (error) => {
        alert(error)
        console.log(error)
      }
    );
    getRequest(
      APIRoutes.getEventsPath(this.state.user_id, "upcoming"),
      (fetchedUpcoming) => {
        LocalStorage.storeItem('upcoming_events', fetchedUpcoming);
        this.setState((prevState)=>{
          return {...prevState, upcomingEvents: fetchedUpcoming }
        });
      },
      (error) => {
        alert(error)
        console.log(error)
      }
    );
    this.setState({isFetching: false});
    console.log(this.state.attendedEvents)
    console.log(this.state.upcomingEvents)
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

  _renderScene = ({route}) => {
    if (this.state.isFetching) {
      return null
    } else {
      switch (route.key) {
        case 'first' : 
          return <UpcomingEventsList upcomingEvents = {this.state.upcomingEvents}/>
        case 'second' : 
          return <AttendedEventsList attendedEvents = {this.state.attendedEvents}/>
        default: 
          return null
      }
    }
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={{height: 0, width: Sizes.width}}
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
    fontSize: normalize(16)
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
    fontSize: normalize(16)
  }
});
