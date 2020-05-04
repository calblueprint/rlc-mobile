import * as React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/shift/Header";
import { CheckBox } from "react-native-elements";
import LocTimeline from "../../components/shift/LocTimeline";
import MapView, { Marker } from "react-native-maps";
import ShiftType from "../../constants/ShiftType.js";

import Colors from "../../constants/Colors";
function instructionDetail(data) {
  const step = data.item;
  return (
    <View>
      <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 17 }}>{step.step}. </Text>
        <Text style={{ fontSize: 17, flex: 1, paddingLeft: 5 }}>
          {step.description}
        </Text>
      </View>
      {step.photo_needed && <View style={styles.upload_box}></View>}
    </View>
  );
}

const withdrawOptions = [
  {
    key: "one",
    text: "Withdraw from this event only",
  },
  {
    key: "all",
    text: "Withdraw from this and all future events",
  },
];

const recurOptions = [
  {
    key: "only",
    text: "This week only",
  },
  {
    key: "every",
    text: "Every week",
  },
];

export default class ShiftScreen extends React.Component {
     constructor(props) {
          super(props)
          const pEvent = this.props.route.params.event;
          console.log("pevent in constructor");
          console.log(pEvent);

          const shiftInstructions = this.createShiftInstructions(pEvent.details.pickup_locations, pEvent.details.dropoff_locations);
          const markers = []
          markers.push(...pEvent.details.pickup_locations);
          pEvent.details.dropoff_locations.map((dropoff) => {
               markers.push({
                    'latlng': {
                         'latitude': dropoff.latitude,
                         'longitude': dropoff.longitude,
                    },
                    'title': dropoff.name,
                    'description': dropoff.address
               })
          });
          console.log("here are the markers", markers);
          console.log("and dropoffs", pEvent.details.dropoff_locations);

          this.state = {
               participantData: [
                    {
                         name: "Alice Russel (You)",
                         role: "Lead Rescuer",
                         profilePic: "../../assets/images/rlcprofilepic.png",
                         verified: false
                    },
                    {
                         name: "Dan Schneider",
                         role: "Volunteer",
                         profilePic: "../../assets/images/rlcprofilepic.png",
                         verified: true
                    }
               ],
               shiftInstructions: shiftInstructions,
               markers: markers
          }
     }


     createShiftInstructions = (pickUp, dropOff) => {
      //add meetup locations
      let shiftInstructions = [
        {
             step: 1,
             description: "Meet your group at " + pickUp[0].title, 
             photo_needed: false
        },
        {
             step: 2,
             description: "Check in all volunteers.",
             photo_needed: false
        },
        {
          step: 3,
          description: "Collect food from vendor.",
          photo_needed: false
        }
        ]

      let nextStep = 4;
      //add pickup locations
        switch (pickUp.length) {
          case 2:
            shiftInstructions.push({
              step: nextStep,
              description: "Walk to " + pickUp[1].title,
              photo_needed: false
            });
            shiftInstructions.push({
              step: nextStep + 1,
              description: "Collect food from vendor.",
              photo_needed: false
            });
            nextStep+=2;
            break;
          default:

        }

        //add dropoff locations
        if (dropOff.length == 1) {

          shiftInstructions.push({
                   step: nextStep,
                   description: "Take a photo of the food once it is delivered to " + dropOff[0].title,
                   photo_needed: true
              });
          shiftInstructions.push({
                   step: nextStep + 1,
                   description: "Request a receipt from " + dropOff[0].title + " and take a photo of the receipt*",
                   photo_needed: true
              }); 
          nextStep += 2;
        }

     return shiftInstructions;
     }

     
     participantCard = (data) => {
          const participant = data.item;
          return (
               <View styles={styles.participant_card}>

                    <View style={styles.participant_badge}>

                         {participant.role == "Volunteer" && <CheckBox
                              checked={participant.verified}
                              onPress={() => this.setState(prevState => { participant.verified != prevState.participant.verified })}
                         />}
                         <Image
                              style={styles.profilePic}
                              source={require("../../assets/images/rlcprofilepic.png")} />
                         <View style={styles.participant_detail}>
                              <Text styles={styles.participant_name}>
                                   {participant.firstname} {participant.lastname}
                              </Text>
                              <Text styles={styles.particpant_role}>
                                   {participant.role === 'normal' ? "Rescuer" : null}
                              </Text>
                         </View>
                    </View>
               </View>
          )
     }

     navigateToMain = () => {
          const { navigate } = this.props.navigation;
          navigate("Main");
     };

     navigateToWithdraw = () => {
          const { navigate } = this.props.navigation;
          const pEvent = this.props.route.params.event;
          console.log(pEvent);
          if (pEvent.details.recurring) {
               navigate("ChangeConfirm", {
                    title: "Withdraw Your Spot",
                    description: "You are about to withdraw your spot from a recurring event.",
                    hasQ: false,
                    question: "",
                    options: withdrawOptions,
                    event_id: pEvent.id,
                    change_type: 'withdraw'
               });
          }
          else {
               navigate("ChangeConfirm", {
                    title: pEvent.details.name,
                    description: "Are you sure you want to withdraw?",
                    hasQ: false,
                    options: [],
                    event_id: pEvent.id,
                    change_type: 'withdraw'
               });
          }
     };

     navigateToSignConfirm = () => {
          const { navigate } = this.props.navigation;
          const pEvent = this.props.route.params.event;
          if (pEvent.details.recurring) {
               navigate("ChangeConfirm", {
                    title: pEvent.details.name,
                    description: "This is a recurring event.",
                    hasQ: true,
                    question: "How often do you want to attend?",
                    options: recurOptions,
                    event_id: pEvent.details.id,
                    change_type: 'signup'
               });
          }
          else {
               navigate("ChangeConfirm", {
                    title: pEvent.details.name,
                    description: "Are you sure you want to attend?",
                    hasQ: false,
                    options: [],
                    event_id: pEvent.details.id,
                    change_type: 'signup'
               });
          }
     };

     selectShiftTitle = (sType) => {
          switch (sType) {
               case ShiftType.searched:
                    return "Event";
               case ShiftType.upcoming:
                    return "Upcoming"
               case ShiftType.attended:
                    return "Attended"
               case ShiftType.current:
                    return "In Progress"
          }
     }
     render() {

          const pEvent = this.props.route.params.event;
          console.log("here's pevent");
          console.log(pEvent);

          //set latitude and longitude
          let lat = 37.78825
          let lon = -122.4324
          pEvent.latitude ? lat = pEvent.latitude : null
          pEvent.longitude ? lon = pEvent.longitude : null

          return (
               <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                         <Header
                              centerTitle={this.selectShiftTitle(pEvent.details.shiftType)}
                              onPressBack={this.navigateToMain}
                              rightSide={(pEvent.details.shiftType === ShiftType.upcoming || pEvent.details.shiftType === ShiftType.current) ? true : false}
                              actionTitle="Withdraw"
                              onPressHandler={this.navigateToWithdraw}
                         />
                    </View>

                    <KeyboardAvoidingView behavior="position" style={{ flex: 5 }}>
                         <View>

                              <ScrollView>
                                   <View style={styles.container}>

                                        {pEvent.details.shiftType === ShiftType.current && 
                                        <Text style={styles.status}>
                                             happening now
                                        </Text>}
                                        <Text style={styles.title}>
                                             {pEvent.details.name}
                                        </Text>
                                        <Text style={styles.overview}>
                                             📍  {pEvent.details.location}
                                        </Text>
                                        <Text style={styles.overview}>
                                             ⏰  {pEvent.details.date}, {pEvent.details.start_time} to {pEvent.details.end_time}
                                        </Text>
                                        <Text style={styles.overview}>
                                             ⚖️  {pEvent.details.weight} lbs
                                        </Text>
                                        <Text style={styles.overview}>
                                             👥  {pEvent.details.spotsOpen}
                                        </Text>
                                        <Text style={styles.overview}>
                                             💪  {pEvent.details.numPickups} Pickup(s)
                                        </Text>

                                        <View style={styles.mapcontainer}>
                                             <MapView style={styles.map}
                                                  initialRegion={{
                                                       latitude: lat,
                                                       longitude: lon,
                                                       latitudeDelta: 0.0922,
                                                       longitudeDelta: 0.0421,
                                                  }}
                                             >
                                                  { this.state.markers && this.state.markers.map(marker => (
                                                       <Marker
                                                            coordinate={marker.latlng}
                                                            title={marker.title}
                                                            description={marker.description}
                                                       />

                                                  ))} 
                                     </MapView>
                               </View>

                {this.state.markers && (
                  <LocTimeline markers={this.state.markers} />
                )}

                <FlatList
                  style={styles.list}
                  data={pEvent.details.attendees}
                  renderItem={this.participantCard}
                />

                <Text style={styles.title}>Shift Tasks</Text>
                <Text
                  style={{ fontSize: 17, paddingTop: 10, paddingBottom: 10 }}
                >
                  *Please take a cab only under extenuating circumstances
                  (weight of food is heavy, harsh weather conditions, etc).
                  Please keep the receipt so that we can reimburse you.
                </Text>
                  <FlatList
                    data={this.state.shiftInstructions}
                    renderItem={instructionDetail}
                  />
                

                {/* <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                             <Text style={{ fontSize: 16 }}>9.</Text>
                                             <Text style={{ fontSize: 16, flex: 1, paddingLeft: 5 }}>Enter pounds of food saved:*</Text>
                                        </View>

                                        <View style={styles.input_box}>
                                             <TextInput
                                                  style={styles.weight_input}
                                                  returnKeyType="next"
                                                  onSubmitEditing={() => this.submit.focus()}
                                                  keyboardType="number-pad"
                                                  style={styles.input}
                                             />
                                        </View> */}

                {(pEvent.details.shiftType === ShiftType.upcoming ||
                  pEvent.details.shiftType === ShiftType.current) && (
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text style={{ fontSize: 17 }}>{this.state.shiftInstructions.length}</Text>
                      <Text style={{ fontSize: 17, flex: 1, paddingLeft: 5 }}>
                        Tap "Complete" to confirm the completion of the event. The
                        last three steps must be completed.
                    </Text>
                    </View>
                  )}

                {(pEvent.details.shiftType === ShiftType.upcoming ||
                  pEvent.details.shiftType === ShiftType.current) && (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={this.navigateToMain}
                      >
                        <Text style={styles.buttonText}>Complete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
            </ScrollView>
            {pEvent.details.shiftType == ShiftType.searched && (
              <View style={styles.signUpButtonContainer}>
                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={this.navigateToSignConfirm}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

ShiftScreen.navigationOptions = {
  title: "In Progress",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingTop: 20,
  },
  guide_box: {
    height: 200,
    marginVertical: 25,
    borderWidth: 2,
  },
  upload_box: {
    height: 200,
    marginVertical: 25,
    borderWidth: 2,
  },
  status: {
    textTransform: "uppercase",
    color: Colors.green,
    fontWeight: "500",
    fontSize: 15,
    paddingVertical: 5,
  },
  title: {
    color: Colors.regularText,
    fontWeight: "600",
    fontSize: 20,
    paddingVertical: 5,
  },
  overview: {
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: 0.5,
    paddingTop: 5,
  },
  list: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
  },
  instructions: {
    padding: 10,
  },
  participant_card: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    padding: 40,
    marginBottom: 20,
    marginTop: 20,
  },
  participant_badge: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    paddingBottom: 10,
    marginTop: 10,
  },
  participant_detail: {
    flexDirection: "column",
    marginHorizontal: 20,
  },
  participant_name: {
    fontSize: 17,
    fontWeight: "700",
  },
  particpant_role: {
    fontSize: 15,
    fontWeight: "400",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  input_box: {
    height: 50,
    borderWidth: 2,
    paddingLeft: 8,
    borderRadius: 5,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  weight_input: {
    fontSize: 17,
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
    flex: 1,
  },
  signUpButtonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    height: 50,
  },
  button: {
    backgroundColor: "#38A5DB",
    justifyContent: "center",
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 5,
    width: "100%",
    height: 50,
  },
  signUpButton: {
    backgroundColor: Colors.mainBlue,
    paddingVertical: 15,
    marginBottom: 30,
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    width: "80%",
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    textTransform: "uppercase",
  },

  mapcontainer: {
    //...StyleSheet.absoluteFillObject,
    height: 200,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
