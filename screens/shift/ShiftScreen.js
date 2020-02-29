import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text, TextInput, FlatList, Switch, Image, TouchableOpacity } from 'react-native';
import Header from "../../components/shift/Header"
import { CheckBox } from 'react-native-elements'



function instructionDetail(data) {
     const step = data.item;
     return (
          <View>
               <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ fontSize: 17 }}>{step.step}. </Text>
                    <Text style={{ fontSize: 17, flex: 1, paddingLeft: 5 }}>{step.description}</Text>
               </View>
               {step.photo_needed && <View style={styles.upload_box}></View>}
          </View>
     )
}



export default class ShiftScreen extends React.Component {
     constructor(props) {
          super(props)
          this.state = {
               participantData: [
                    {
                         name: "Alice Russel (You)",
                         role: "Lead Rescuer",
                         profilePic: "../../assets/images/rlcprofilepic.png",
                         verified: false
                    },
                    {
                         name: "William Franklin",
                         role: "Volunteer",
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
               shiftInstructions: [
                    {
                         step: 1,
                         description: "Meet your group at Latin Beet (17 East 16th Street).",
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
                    },
                    {
                         step: 4,
                         description: "Walk to Dig Inn (364 Bleecker St.).",
                         photo_needed: false
                    },
                    {
                         step: 5,
                         description: "Collect food from vendor.",
                         photo_needed: false
                    },
                    {
                         step: 6,
                         description: "Walk to Bowery Mission (227 Bowery).",
                         photo_needed: false

                    },
                    {
                         step: 7,
                         description: "Take a photo of the food once it is delivered to Bowery Mission*",
                         photo_needed: true
                    },
                    {
                         step: 8,
                         description: "Request a receipt from Bowery Mission and take a photo of the receipt*",
                         photo_needed: true
                    },
               ]
          }
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
                                   {participant.name}
                              </Text>
                              <Text styles={styles.particpant_role}>
                                   {participant.role}
                              </Text>
                         </View>
                    </View>

               </View>
          )
     }

     navigateToDash = () => {
          const { navigate } = this.props.navigation;
          navigate("Dash");
     };

     render() {
          return (
               <KeyboardAvoidingView behavior="position">
                    <ScrollView>
                         <Header
                              centerTitle="In Progress"
                              onPressBack={this.navigateToDash}
                              actionTitle="Withdraw"
                              onPressHandler={this.navigateToDash}
                         />
                         <View style={styles.container}>

                              <Text style={styles.status}>
                                   happening now
                              </Text>
                              <Text style={styles.title}>
                                   Union Square (US014)
                              </Text>
                              <Text style={styles.overview}>
                                   📍  Union Square
                              </Text>
                              <Text style={styles.overview}>
                                   ⏰  Mondays, 8.15pm to 9:00pm
                              </Text>
                              <Text style={styles.overview}>
                                   ⚖️  10lbs to 45 lbs
                              </Text>
                              <Text style={styles.overview}>
                                   👥  1 of 2 spots open
                              </Text>
                              <Text style={styles.overview}>
                                   💪  Multi-pickup
                              </Text>

                              <View style={styles.map_box}>

                              </View>

                              <View style={styles.guide_box}>

                              </View>

                              <FlatList
                                   data={this.state.participantData}
                                   renderItem={this.participantCard}
                              />

                              <Text style={{ fontSize: 20, color: "#4B5D68", marginTop: 15, marginBottom: 10, fontWeight: '500' }}>
                                   Shift Tasks
                              </Text>
                              <Text style={{ fontSize: 17 }}>
                                   *Please take a cab only under extenuating circumstances (weight of food is heavy, harsh weather conditions, etc). Please keep the receipt so that we can reimburse you.
                              </Text>
                              <FlatList
                                   data={this.state.shiftInstructions}
                                   renderItem={instructionDetail}
                              />

                              <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
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
                              </View>

                              <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                                   <Text style={{ fontSize: 17 }}>10.</Text>
                                   <Text style={{ fontSize: 17, flex: 1, paddingLeft: 5 }}>Tap "Complete" to confirm the completion of the event. The last three steps must be completed.</Text>
                              </View>

                              <View style={styles.buttonContainer}>
                                   <TouchableOpacity style={styles.button}>
                                        <Text style={styles.buttonText}>Complete</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>


                    </ScrollView>



               </KeyboardAvoidingView>
          )
     }

}

ShiftScreen.navigationOptions = {
     title: "In Progress"
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          padding: 40,
          paddingTop: 20,
     },
     map_box: {
          height: 200,
          marginVertical: 15,
          borderWidth: 2
     },
     guide_box: {
          height: 200,
          marginVertical: 25,
          borderWidth: 2
     },
     upload_box: {
          height: 200,
          marginVertical: 25,
          borderWidth: 2
     },
     status: {
          textTransform: "uppercase",
          color: "#79B830",
          fontWeight: "500",
          fontSize: 15,
          paddingVertical: 5
     },
     title: {
          color: "#4A4A4A",
          fontWeight: "500",
          fontSize: 20,
          paddingVertical: 5
     },
     overview: {
          fontSize: 17,
          lineHeight: 25,
          letterSpacing: .5,
     },
     participant_card: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          padding: 40,
          marginBottom: 20,
          marginTop: 20,
     },
     participant_badge: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          borderBottomWidth: 1,
          borderColor: "#CCCCCC",
          paddingBottom: 10,
          marginTop: 10
     },
     volunteer_switch: {
          width: 50,
          alignSelf: 'center'
     },
     participant_detail: {
          flexDirection: 'column',
          marginHorizontal: 20
     },
     participant_name: {
          fontSize: 17,
          fontWeight: "600",
     },
     particpant_role: {
          fontSize: 15,
          fontWeight: "400",
     },
     profilePic: {
          width: 50,
          height: 50,
          borderRadius: 50 / 2
     },
     input_box: {
          borderWidth: 2,
          paddingLeft: 8,
          borderRadius: 10,
          color: "#CCCCCC",
          marginBottom: 10
     },
     weight_input: {
          fontSize: 17
     },
     button: {
          backgroundColor: '#38A5DB',
          paddingVertical: 15,
          marginBottom: 20,
          borderRadius: 5,
          width: 250,
     },
     buttonContainer: {
          alignItems: 'center',
          marginTop: 20,
          flex: 1,
          alignItems: 'center',
          height: 50
     },
     buttonText: {
          textAlign: 'center',
          color: '#FFFFFF',
          fontWeight: '600',
          textTransform: "uppercase"
     }
})