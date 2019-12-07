import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import LocalStorage from '../../helpers/LocalStorage';
import { getRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';
import ActivityCard from '../../components/dashboard/ActivityCard.js';

export default class EventsList2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      events: [],
      routes: [
        { key: 'first', title: 'Upcoming' },
        { key: 'second', title: 'Completed' },
      ],
    }
  }

  componentDidUpdate = () => {
    this.FirstRoute()
  }

  renderEvent = () => {
    // if (this.props.events.length == 0) {
    //   return
    // } else {
   
      console.log(this.props.events);
      // console.log("bruhhhh")
      const {events} = this.props
      console.log(events)
      console.log("new log")
      const retEvents = events.map(event => {
        return (<View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
          <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
            <ScrollView style={{height: "100%"}}>
                <ActivityCard 
                  location={event["title"]}
                  name={event["title"]}
                  time={event["title"]}
                  weight={event["title"]}
                  numpickups={event["title"]}
                  spotsOpen={event["title"]}
                />
                
            </ScrollView>
          </View>
        </View>
      )
    })
    return retEvents
  }

  FirstRoute = () => {
    return (
      <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
        <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
          <ScrollView style={{height: "100%"}}>
            <Text style={styles.heading}>starting_date_with_full_weekday_name</Text>
            {this.renderEvent()}
          </ScrollView>
        </View>
      </View>
    )
  }
  
  SecondRoute = () => {
    return(
      <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
        <ScrollView style={{height: "100%"}}>
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
    )
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
    first: this.FirstRoute,
    second: this.SecondRoute,
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


// import React, { Component } from 'react';
// import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import Animated from 'react-native-reanimated';
// import LocalStorage from '../../helpers/LocalStorage';
// import { getRequest } from '../../lib/requests';
// import { APIRoutes } from '../../config/routes';
// import ActivityCard from '../../components/dashboard/ActivityCard.js';

// export default class EventsList2 extends Component {
//   constructor(props) {
//     super(props);
//       this.state = {
//         index: 0,
//         user_id: 0,
//         events: [],
//         routes: [
//           { key: 'first', title: 'Upcoming' },
//           { key: 'second', title: 'Completed' },
//         ],
//       };
//   }  

//   componentDidUpdate = () => {
//     LocalStorage.getUser().then((user) => {
//       this.setState({ user_id: user.id });
//     });
//   }

//   _handleIndexChange = index => this.setState({ index });

//   _renderTabBar = props => {
//     const inputRange = props.navigationState.routes.map((x, i) => i);
//     return (
//       <View style={styles.tabBar}>
//         {props.navigationState.routes.map((route, i) => {
//           const color = Animated.color(
//             Animated.round(
//               Animated.interpolate(props.position, {
//                 inputRange,
//                 outputRange: inputRange.map(inputIndex =>
//                   inputIndex === i ? 56 : 117
//                 ),
//               })
//             ),
//             Animated.round(
//               Animated.interpolate(props.position, {
//                 inputRange,
//                 outputRange: inputRange.map(inputIndex =>
//                   inputIndex === i ? 165 : 117
//                 ),
//               })
//             ),
//             Animated.round(
//               Animated.interpolate(props.position, {
//                 inputRange,
//                 outputRange: inputRange.map(inputIndex =>
//                   inputIndex === i ? 219 : 117
//                 ),
//               })
//             )
//           );

//           return (
//             <TouchableOpacity
//               key={i}
//               style={styles.tabItem}
//               onPress={() => this.setState({ index: i })}>
//               <Animated.Text style={{ color }}>{route.title}</Animated.Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   };

//   firstRoute = () => {
//     return (
//       <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
//         <ScrollView style={{height: "100%"}}>
//           {this.renderEvent()}
//         </ScrollView>
//       </View>
//     );
//   }
  
//   secondRoute = () => {
//     return (
//       <View style={[styles.scene, { backgroundColor: '#FFFFFF' }]}>
//           <ScrollView style={{height: "100%"}}>
//           <Text style={styles.heading}>Sunday, June 19, 2019</Text>
//           <ActivityCard 
//             location={"📍 Home"}
//             name={"Union Square (US014)"}
//             time={"8:15 to 9:15 AM"}
//             weight={"10 to 45 lbs"}
//             numpickups={"2"}
//             spotsOpen={"1 of 2"}
//           />
//         </ScrollView>
//       </View>
//     );
//   }
  
//   _fetchEvents = () => {
//     console.log("FETCH EVENTS")
//     console.log(this.state)
//     return getRequest(
//         APIRoutes.getEventsPath(this.state.user_id, 'attended'),
//         (responseData) => {
//             // console.log(responseData);
//             this.setState({events: responseData});
//         },
//         (error) => {
//           console.log(error);
//         },
//     );
//   }

  // renderEvent = () => {
  //   this._fetchEvents()
  //   events = this.state.events;
  //   var date = events[0]["date"]["starting_date_with_full_weekday_name"];
  //   var i;
  //   for (i = 0; i< events.length; i++) {
  //     current_date = events[i]["starting_date_with_full_weekday_name"]
  //     if (current_date != date) {
  //       date = current_date
  //       return ([
  //         <Text style={styles.heading}>{events[i]["starting_date_with_full_weekday_name"]}</Text>,
  //         <ActivityCard 
  //           location={events[i]["address"]}
  //           name={events[i]["title"]}
  //           time={events[i]["starting_hour"]}
  //           weight={events[i]["title"]}
  //           numpickups={events[i]["title"]}
  //           spotsOpen={events[i]["title"]}
  //         />
  //       ])
  //     } else {
  //       return (
  //         <ActivityCard 
  //           location={events[i]["address"]}
  //           name={events[i]["title"]}
  //           time={events[i]["starting_hour"]}
  //           weight={events[i]["title"]}
  //           numpickups={events[i]["title"]}
  //           spotsOpen={events[i]["title"]}
  //         />
  //       )
  //     }
  //   }
  // }

//   _renderScene = SceneMap({
//     first: <ActivityCard 
//               location={events[i]["address"]}
//               name={events[i]["title"]}
//               time={events[i]["starting_hour"]}
//               weight={events[i]["title"]}
//               numpickups={events[i]["title"]}
//               spotsOpen={events[i]["title"]}
//             />,
//     second: <ActivityCard 
//               location={events[i]["address"]}
//               name={events[i]["title"]}
//               time={events[i]["starting_hour"]}
//               weight={events[i]["title"]}
//               numpickups={events[i]["title"]}
//               spotsOpen={events[i]["title"]}
//             />,
//   });

//   render() {
//     return (
//         <TabView
//           navigationState={this.state}
//           renderScene={this._renderScene}
//           renderTabBar={this._renderTabBar}
//           onIndexChange={this._handleIndexChange}
//         />
//     );
//   }
// }

// const styles = StyleSheet.create({
//     button: {
//         backgroundColor: '#38A5DB',
//         paddingVertical: 15,
//         borderRadius: 5,
//         width: 250,
//     },
//     buttonContainer: {
//         alignItems: 'center',
//         marginTop: 20,
//         height: 50
//     },
//     buttonText: {
//         textAlign: 'center',
//         color: '#FFFFFF',
//         fontWeight: '600',
//         textTransform: "uppercase"
//     },
//     scene: {
//         flex: 1,
//     },
//     subText: {
//         color: '#757575',
//         fontStyle: 'italic',

//         textAlign: 'center',
//         justifyContent: 'center',
//         fontWeight: 'normal',
//         marginTop: '0%',

//         opacity: 0.85,
//         fontSize: 16
//     },
//     infoContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#FFFFFF'
//         // margin: 'auto',
//     },
//     container: {
//         flex: 1,
//     },
//     tabBar: {
//         flexDirection: 'row',
//         paddingTop: 10,
//     },
//     tabItem: {
//         flex: 1,
//         alignItems: 'center',
//         padding: 10,
//     },
//     heading: {
//       color: '#000000',
//       marginTop: 10,
//       marginBottom: 10,
//       marginLeft: "8%",
//       textAlign: 'left',
//       fontWeight: '600',
//       opacity: 0.7,
//       fontSize: 16
//   }
// });