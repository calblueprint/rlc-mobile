// Place Holder for Search Feature
import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Sizes from "../../constants/Sizes.js";
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

import TimeOrLoc from '../../components/search/timeOrLoc.js';

const dayOptions = [
    {
        key: "monday",
        text: "Monday",
    },
    {
        key: "tuesday",
        text: "Tuesday",
    },
    {
        key: "wednesday",
        text: "Wednesday",
    },
    {
        key: "thursday",
        text: "Thursday",
    },
    {
        key: "friday",
        text: "Friday",
    },
    {
        key: "saturday",
        text: "Saturday",
    },
    {
        key: "sunday",
        text: "Sunday",
    }
];

const numOfTimes = 4;
export default class Search extends Component {

    constructor(props) {
        super(props);

        this.selectAll = this.selectAll.bind(this)
        this.flipState = this.flipState.bind(this)

        this.state = {
            selectedDay: "monday",
            selectedAll: false,

            monday: {
                all: {
                    key: 'all',
                    text: "Select the entire day",
                    value: false
                },
                morn: {
                    key: '9_12',
                    text: "9AM-12PM",
                    value: false
                },
                afternoon: {
                    key: '12_3',
                    text: "12PM-3PM",
                    value: false
                },
                evening: {
                    key: '3_6',
                    text: "3PM-6PM",
                    value: false
                },
                night: {
                    key: '6_9',
                    text: "6PM-9PM",
                    value: false
                },
            },
            tuesday: {
                all: {
                    key: 'all',
                    text: "Select the entire day",
                    value: false
                },
                morn: {
                    key: '9_12',
                    text: "9AM-12PM",
                    value: false
                },
                afternoon: {
                    key: '12_3',
                    text: "12PM-3PM",
                    value: false
                },
                evening: {
                    key: '3_6',
                    text: "3PM-6PM",
                    value: false
                },
                night: {
                    key: '6_9',
                    text: "6PM-9PM",
                    value: false
                },
            },
            wednesday: {
                all: {
                    key: 'all',
                    text: "Select the entire day",
                    value: false
                },
                morn: {
                    key: '9_12',
                    text: "9AM-12PM",
                    value: false
                },
                afternoon: {
                    key: '12_3',
                    text: "12PM-3PM",
                    value: false
                },
                evening: {
                    key: '3_6',
                    text: "3PM-6PM",
                    value: false
                },
                night: {
                    key: '6_9',
                    text: "6PM-9PM",
                    value: false
                },
            },
            thursday: {
                all: {
                    key: 'all',
                    text: "Select the entire day",
                    value: false
                },
                morn: {
                    key: '9_12',
                    text: "9AM-12PM",
                    value: false
                },
                afternoon: {
                    key: '12_3',
                    text: "12PM-3PM",
                    value: false
                },
                evening: {
                    key: '3_6',
                    text: "3PM-6PM",
                    value: false
                },
                night: {
                    key: '6_9',
                    text: "6PM-9PM",
                    value: false
                },
            },
            friday: {
                all: {
                    key: 'all',
                    text: "Select the entire day",
                    value: false
                },
                morn: {
                    key: '9_12',
                    text: "9AM-12PM",
                    value: false
                },
                afternoon: {
                    key: '12_3',
                    text: "12PM-3PM",
                    value: false
                },
                evening: {
                    key: '3_6',
                    text: "3PM-6PM",
                    value: false
                },
                night: {
                    key: '6_9',
                    text: "6PM-9PM",
                    value: false
                },
            },
            saturday: {
                all: {
                    key: 'all',
                    text: "Select the entire day",
                    value: false
                },
                morn: {
                    key: '9_12',
                    text: "9AM-12PM",
                    value: false
                },
                afternoon: {
                    key: '12_3',
                    text: "12PM-3PM",
                    value: false
                },
                evening: {
                    key: '3_6',
                    text: "3PM-6PM",
                    value: false
                },
                night: {
                    key: '6_9',
                    text: "6PM-9PM",
                    value: false
                },
            },
            sunday: {
                all: {
                    key: 'all',
                    text: "Select the entire day",
                    value: false
                },
                morn: {
                    key: '9_12',
                    text: "9AM-12PM",
                    value: false
                },
                afternoon: {
                    key: '12_3',
                    text: "12PM-3PM",
                    value: false
                },
                evening: {
                    key: '3_6',
                    text: "3PM-6PM",
                    value: false
                },
                night: {
                    key: '6_9',
                    text: "6PM-9PM",
                    value: false
                },
            },

        }
    }


    selectAll = () => {
        const checked = !this.state.selectedAll; // get the value
        // checked ? pass number into time
        this.setState(prevState => ({ selectedAll: !prevState.selectedAll })); // set value

        dayOptions.map((day) => (this.setState(prevState => { //set for each day
            let selDay = { ...prevState[day.key] }
            Object.keys(selDay).map((timeObj) => (selDay[timeObj].value = checked))
            return selDay
        })))
        console.log(checked)
    }

    updateDay = (newDay) => {
        this.setState({ selectedDay: newDay });
    }

    flipState = (day, time) => () => {
        this.setState(prevState => {
            let selDay = { ...prevState[day] }

            if (time == 'all') { //if selecting all
                const checked = !selDay[time].value
                var alreadySame = 0;
                for (const timeObj of Object.keys(selDay)) {
                    if (selDay[timeObj].value == checked) {
                        alreadySame++;
                    }
                }
                //safety check
                if (alreadySame > numOfTimes) {
                    alreadySame = numOfTimes;
                }

                if (checked) {
                    // pass value into time this.props.action(numOfTimes - alreadySame, false)
                } else {
                    // pass value into time this.props.action(alreadySame - numOfTimes, false)
                }

                Object.keys(selDay).map((timeObj) => (selDay[timeObj].value = checked))

            } else {
                // pass value into time selDay[time].value ? this.props.action(-1, false) : this.props.action(1, false)
                selDay[time].value = !selDay[time].value
            }
            return selDay
        })

    }

    search = () => {
    }

    render() {
        return (
            <View style={{ ...Styles.container, ...styles.container }}>
                <View style={styles.header}>
                    <Text style={Styles.title}>Search for an Event </Text>
                </View>
                <View style={{ flex: 14 }}>
                    {console.log(this.state.selectedAll)}
                    <TimeOrLoc updateOneTime={this.flipState} updateSelectAll={this.selectAll} selAllVal={this.state.selectedAll}
                        selectedDay={this.state.selectedDay} updateSelDay={this.updateDay}
                        dayops={dayOptions} timeops={this.state[this.state.selectedDay]} />
                </View>
                <View style={{ flex: 1, marginHorizontal: "10%", marginVertical: "3%" }}>
                    <TouchableOpacity
                        style={{ ...styles.button, ...styles.buttonText }}
                        onPress={this.search}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: "5%",
        flex: 1,
        flexDirection: "column",
        alignContent: "space-around",
        width: Sizes.width,
    },
    header: {
        flex: 1,
        marginHorizontal: "10%",
        //borderBottomWidth: 2,
        //borderBottomColor: Colors.tabIconDefault,
    },
    button: {
        backgroundColor: '#38A5DB',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 50,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600',
        textTransform: "uppercase"
    },

})
