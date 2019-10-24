import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { Constants } from 'expo-constants';
import { postRequest, getRequest } from '../lib/requests';
import { APIRoutes } from '../config/routes';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>

        <View style={styles.infoContainer}>
            <Text style={styles.subText}>Oh no! You have no upcoming shifts.</Text>
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
        </View>


  </View>
);

export default class EventsList extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Upcoming' },
      { key: 'second', title: 'Completed' },
    ],
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
                  inputIndex === i ? 255 : 0
                ),
              })
            ),
            0,
            0
          );

          return (
            <TouchableOpacity
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
    console.log("FETCH EVENTS")
    return getRequest(
        APIRoutes.getEventsPath('attended'),
        (responseData) => {
            console.log(responseData)
        },
        (error) => {
          console.log(error)
        },
    );
  }

  render() {
    this._fetchEvents()
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
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        margin: 'auto',
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
