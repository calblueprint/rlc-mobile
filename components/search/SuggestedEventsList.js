import React, { Component } from "../../node_modules/react";
import { FlatList, StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import ActivityCard from "../dashboard/ActivityCard.js";
import DatePicker from "react-native-datepicker";
import { getRequest, postRequest } from "../../lib/requests.js"

import Styles from "../../constants/Styles.js";
import Sizes from "../../constants/Sizes.js";
import { normalize } from "../../utils/Normalize.js";
import Colors from "../../constants/Colors";

import ShiftType from "../../constants/ShiftType.js";

export default class SuggestedEventsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            selectedEventsInDay: [],
            locations: {}
        }
    }

    componentDidMount() {
        const locations = {};
        const location_ids = [];
        for (let i = 0; i < this.props.preferredLocations.length; i++) {
            const locationId = this.props.preferredLocations[i]["id"];
            const locationName = this.props.preferredLocations[i]["name"];
            locations[locationId] = locationName;
            location_ids.push(locationId);
        }
        locations['66']="Astoria";
        location_ids.push(66);
        console.log("my locs", locations);
        const times = this.props.preferredTimes;
        // console.log("hello times", this.props.preferredTimes);
        // let times = [];
        // this.props.preferredTimes.map((time)=>{
        //     times.push(time.start.toISOString() + ", " + time.end.toISOString());
        // })
        // console.log(times);
        //locations[1] = "Bushwick";
        this.setState({ locations: locations, location_ids: location_ids, times: times }, () => { this.processEventData(); });
    }

    processEventData() {
        console.log("processing Search");
        postRequest(
            `api/search_events`,//${this.state.date.toISOString()}`,
            responseData => {
                console.log(responseData);
                const selectedEventsInDay = [];
                for (let i = 0; i < responseData.length; i++) {
                    const currentEvent = {};
                    const eventDetails = {};
                    eventDetails["name"] = responseData[i]["title"];
                    eventDetails["spotsOpen"] = responseData[i]["slot"];
                    eventDetails["weight"] = responseData[i]["weight"];
                    eventDetails["numPickups"] = responseData[i]["numPickups"];
                    const startingTime = new Date(responseData[i]["starting_time"]);
                    const endingTime = new Date(responseData[i]["ending_time"]);
                    eventDetails["shiftType"] = ShiftType.searched;
                    eventDetails["date"] = startingTime.toLocaleDateString("en-US")
                    eventDetails["start_time"] = startingTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                    eventDetails["end_time"] = endingTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                    eventDetails["dropoff_locations"] = responseData[i]["dropoff_locations"];
                    eventDetails["location"] = responseData[i]["location"]
                    eventDetails["recurring"] = responseData[i]["recurring"]
                    eventDetails["id"] = responseData[i]["id"]
                    if (responseData[i]["location_id"] !== null) {
                        console.log("nullcheck");
                        const locationIdString = responseData[i]["location_id"].toString();
                        if (this.state.locations[locationIdString] != null) {
                            currentEvent["address"] = this.state.locations[locationIdString];
                            currentEvent["details"] = eventDetails;
                            selectedEventsInDay.push(currentEvent);
                        }
                    }
                }
                console.log("finsihed?");
                console.log(selectedEventsInDay);
                this.setState({ selectedEventsInDay: selectedEventsInDay }, () => { this.render() });
            },
            error => {
                console.log(error);
            },
            {times: this.state.times, location_ids: this.state.location_ids});
    }
 
    renderNewEvents(chosenDate) {
        postRequest(
            `api/search_events`,
            responseData => {
                const selectedEventsInDay = [];
                for (let i = 0; i < responseData.length; i++) {
                    const currentEvent = {};
                    const eventDetails = {};
                    eventDetails["name"] = responseData[i]["title"];
                    eventDetails["spotsOpen"] = responseData[i]["slot"];
                    eventDetails["weight"] = responseData[i]["pound"] + " lbs";
                    eventDetails["numPickups"] = responseData[i]["numPickups"];
                    eventDetails["dropoff_locations"] = responseData[i]["dropoff_locations"];
                    eventDetails["location"] = responseData[i]["location"]
                    const startingTime = new Date(responseData[i]["starting_time"]);
                    const endingTime = new Date(responseData[i]["ending_time"]);
                    eventDetails["shiftType"] = ShiftType.searched;
                    eventDetails["date"] = startingTime.toLocaleDateString("en-US")
                    eventDetails["start_time"] = startingTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                    eventDetails["end_time"] = endingTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                    eventDetails["recurring"] = responseData[i]["recurring"]
                    eventDetails["id"] = responseData[i]["id"]
                    if (responseData[i]["location_id"] != null) {
                        const locationIdString = responseData[i]["location_id"].toString();
                        if (this.state.locations[locationIdString] != null) {
                            currentEvent["address"] = this.state.locations[locationIdString];
                            currentEvent["details"] = eventDetails;
                            selectedEventsInDay.push(currentEvent);
                        }
                    }
                }
                console.log(responseData);
                console.log("done?");
                this.setState({ selectedEventsInDay: selectedEventsInDay }, () => { this.render() });
            },
            error => {
                console.log(error);
            },
            {date: chosenDate, location_ids: this.state.location_ids});
    }

    render() {
        if (this.state.selectedEventsInDay.length == 0) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={Styles.title}>Suggested Events</Text>
                        <View style={{
                            boderBottomColor: "black",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: "100%"
                        }}></View>
                        <DatePicker style={{ marginTop: "2%", marginBottom: "2%" }} date={this.state.date} mode="date" onDateChange={date => this.setState({ date: date }, () => { this.renderNewEvents(date) })} confirmBtnText="Confirm"
                            cancelBtnText="Cancel" customStyles={{ btnTextConfirm: { color: Colors.mainBlue } }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.subText}>
                            There are no events on this date.
                        </Text>
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={Styles.title}>Suggested Events</Text>
                        <View style={{
                            boderBottomColor: "black",
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: "100%"
                        }}></View>
                        <DatePicker style={{ marginTop: "2%", marginBottom: "2%" }} date={this.state.date} mode="date" onDateChange={date => this.setState({ date: date }, () => { this.renderNewEvents(date) })} confirmBtnText="Confirm"
                            cancelBtnText="Cancel" customStyles={{ btnTextConfirm: { color: Colors.mainBlue } }} />
                    </View>
                    <FlatList
                        data={this.state.selectedEventsInDay}
                        renderItem={({ item }) => (
                            <ActivityCard
                                event={item}
                                navigation={this.props.navigation}
                            />
                        )}
                        keyExtractor={item => item["id"]}
                    />
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Sizes.width,
    },
    header: {
        alignItems: "center",
    },
    headerText: {
        textAlign: "center",
        color: "#000000",
        fontWeight: "600",
        textTransform: "uppercase",
    },
    datePicker: {
        marginBottom: "3%",
        marginTop: "1%",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
        margin: "auto",
    },
    subText: {
        color: "#757575",
        fontStyle: "italic",
        textAlign: "center",
        justifyContent: "center",
        fontWeight: "normal",
        marginTop: "0%",
        opacity: 0.85,
        fontSize: normalize(16),
    },
});