import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import LocalStorage from '../helpers/LocalStorage';
import { Constants } from 'expo-constants';
import { postRequest, getRequest } from '../lib/requests';
import { APIRoutes } from '../config/routes';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>

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

const SecondRoute = () => (

  <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
      <View style={styles.infoContainer}>
            <Text style={styles.subText}>Did you know?{"\n"}
            RLC has rescued over 1.7 million{"\n"}
            pounds of food! Sign up for an event{"\n"}
            and be a part of the movement!</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up for Shift</Text>
                </TouchableOpacity>
            </View>
      </View>
  </View>
);

export default class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      user_id: 0,
      events: [],
      routes: [
        { key: 'first', title: 'Upcoming' },
        { key: 'second', title: 'Completed' },
      ],
    }
  }

  componentDidMount = () => {
    this._fetchEvents()
  }

  componentDidUpdate = () => {
    LocalStorage.getUser().then((user) => {
      this.setState({ user_id: user.id });
    });
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
                ),
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 165 : 117
                ),
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 219 : 117
                ),
              })
            )
          );

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  _fetchEvents = () => {
    // console.log("FETCH EVENTS")
    return getRequest(
        APIRoutes.getEventsPath(this.state.user_id, 'attended'),
        (responseData) => {
            // console.log(responseData);
            this.setState({events: responseData});
        },
        (error) => {
          // console.log(error)
        },
    );
  }

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
        backgroundColor: '#38A5DB',
        paddingVertical: 15,
        borderRadius: 5,
        width: 250,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        height: 50
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600',
        textTransform: "uppercase"
    },
    scene: {
        flex: 1,
    },
    subText: {
        color: '#757575',
        fontStyle: 'italic',

        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'normal',
        marginTop: '0%',

        opacity: 0.85,
        fontSize: 16
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
        // margin: 'auto',
    },
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
});
