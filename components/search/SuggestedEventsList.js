import React, { Component } from '../../node_modules/react';
import { FlatList, StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import ActivityCard from '../dashboard/ActivityCard.js';
import DatePicker from 'react-native-datepicker'
import ShiftType from "../../constants/ShiftType.js";
import { getRequest } from "../../lib/requests.js"

import Styles from '../../constants/Styles.js';
import Sizes from "../../constants/Sizes.js";

const data = [
    {
        id: "1",
        date: "today",
        location: "Union Square",
        name: "Union Square (US014)",
        time: "8:15 to 9:15 PM",
        weight: "10 to 45 lbs",
        numpickups: "2",
        spotsOpen: "1 of 2"
    },
    {
        id: "2",
        date: "tomorrow",
        location: "Williamsburg",
        name: "South Side Mission (WB001)",
        time: "10:30 to 11:30 AM",
        weight: "10 to 45 lbs",
        numpickups: "1",
        spotsOpen: "2 of 4"
    }
]

export default class SuggestedEventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            selectedEventsInDay: data
        }
    }

    componentDidMount() {
        // Before rendering, we need to set the date to today, retrieve the events and choose the ones for today and that match
        // the desired times that the user provided in the previous screen
        // Call some get request here to get the data for a certain date and then set that to the selectedEventsInDay
        getRequest(
            `api/get_events/${this.state.date.toString()}`,
            responseData => {
                console.log("event info", responseData);
                // this.setState({ events: responseData });
            },
            error => {
                console.log("There was some error: ", error)
            });
        this.setState({ selectedEventsInDay: data });
    }

    moveToShiftScreen(location, time, weight, numpickups, spotsOpen) {
        const { navigate } = this.props.navigation;
        navigate('Shift', {
            typeOfShift: ShiftType.searched,
            locationName: location,
            timeOfShift: time,
            foodWeight: weight,
            numSpots: spotsOpen,
            pickup: numpickups,
            mapMarkers: [
                {
                    markID: 1, latitude: null, longitude: null, title: 'Latin Beet (Meet here) ', description: '18 East 16th Street, New York, NY 10003 \n'
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
            ],
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
        });
    }

    renderNewEvents(chosenDate) {
        // Find the events in the larger dataset that match the date with the proper get request
        // Modify data prop provided to FlatList to take in only the events for the date we're looking at
        getRequest(
            `api/get_events/${chosenDate.toString()}`,
            responseData => {
                console.log("event info", responseData);
                // this.setState({ events: responseData });
            },
            error => {
                console.log(error)
            });
        this.setState({ selectedEventsInDay: [data[1]] });
    }

    render() {
        return (
            <SafeAreaView behavior="padding" style={styles.container}>
                <View style={styles.header}>
                    <Text style={Styles.title}>Suggested Events</Text>
                    <View style={{
                        boderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: '100%'
                    }}></View>
                    <DatePicker style={{ marginTop: '2%', marginBottom: '2%' }} date={this.state.date} mode='date' minimumDate={this.state.date} onDateChange={date => this.setState({ date: date }, () => { this.renderNewEvents(date) })} />
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.selectedEventsInDay}
                        renderItem={({ item }) => (
                            <ActivityCard
                                location={item.location}
                                name={item.name}
                                time={item.time}
                                weight={item.weight}
                                numpickups={item.numPickups}
                                spotsOpen={item.spotsOpen}
                                onPressHandler={(location, time, weight, numpickups, spotsOpen) => { this.moveToShiftScreen(location, time, weight, numpickups, spotsOpen) }}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Sizes.width
    },
    header: {
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '600',
        textTransform: "uppercase"
    },
    datePicker: {
        marginBottom: 20,
        marginTop: 5,
    },
});