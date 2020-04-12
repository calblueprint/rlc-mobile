import React from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import Styles from "../../constants/Styles";
import Sizes from "../../constants/Sizes.js";
import { normalize } from "../../utils/Normalize";
import { CheckBox } from 'react-native-elements';

const numOfTimes = 4;

const options = [
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


export default class TimeTab extends React.Component {
    constructor(props) {
        super(props);
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
        checked ? this.props.action(28, true) : this.props.action(0, true);//set to all or no times selected

        this.setState(prevState => ({ selectedAll: !prevState.selectedAll })); // set value

        options.map((day) => (this.setState(prevState => { //set for each day
            let selDay = { ...prevState[day.key] }
            Object.keys(selDay).map((timeObj) => (selDay[timeObj].value = checked))
            return selDay
        })))
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
                    this.props.action(numOfTimes - alreadySame, false)
                } else {
                    this.props.action(alreadySame - numOfTimes, false)
                }

                Object.keys(selDay).map((timeObj) => (selDay[timeObj].value = checked))

            } else {
                selDay[time].value ? this.props.action(-1, false) : this.props.action(1, false)
                selDay[time].value = !selDay[time].value
            }
            return selDay
        })

    }

    render() {
        var currDay = this.state[this.state.selectedDay]
        return (
            <View style={{ ...Styles.container, ...styles.container }}>
                <View style={{ ...styles.selContainer, backgroundColor: "#EEEEEE", paddingHorizontal: "10%" }}>
                    <Text style={{ ...styles.selObj, fontSize: normalize(14) }}>Select All Days and All Times </Text>
                    <CheckBox checked={this.state.selectedAll} style={styles.selObj} onPress={this.selectAll} />
                </View>
                <View style={{ flex: 1, borderBottomColor: "#CCCCCC", borderBottomWidth: 2, width: "100%" }}>
                    <ScrollView horizontal={true}>
                        <View style={{
                            flex: 1, flexDirection: "row", padding: "2%"
                        }}>
                            {
                                options.map((item) => {
                                    return item.key === this.state.selectedDay ?
                                        <View key={item.key} style={styles.buttonContainer}>

                                            <TouchableOpacity
                                                style={styles.selButton}
                                                onPress={() => this.setState({ selectedDay: item.key })} // we set our value state to key
                                            >
                                                <Text style={styles.selText}>{item.text}</Text>
                                            </TouchableOpacity>

                                        </View>
                                        :
                                        <View key={item.key} style={styles.buttonContainer}>

                                            <TouchableOpacity
                                                style={styles.unSelButton}
                                                onPress={() => this.setState({ selectedDay: item.key })} // we set our value state to key
                                            >
                                                <Text style={styles.unSelText}>{item.text}</Text>
                                            </TouchableOpacity>

                                        </View>

                                })}
                        </View>
                    </ScrollView>
                </View>

                <View style={{ flex: 6 }}>
                    <ScrollView>
                        <View style={styles.timecontainer}>

                            {Object.keys(currDay).map((time) => (
                                <View style={styles.secSelContainer}>
                                    <Text style={{ ...styles.selObj, fontSize: normalize(14) }}>{currDay[time].text}</Text>
                                    <CheckBox checked={currDay[time].value} style={{ ...styles.selObj, paddingHorizontal: "0%" }} onPress={this.flipState(this.state.selectedDay, time)} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
    },
    selContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: "5%",

    },
    selObj: {
        flex: 1,
        alignSelf: "center",
        paddingHorizontal: "3%",
    },


    //day buttons
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: Sizes.width * 0.015
    },

    unSelButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Sizes.width * 0.025,
        height: "75%",
        borderWidth: 3,

        borderColor: "white",

    },
    unSelText: {
        fontWeight: "400",
        color: "#757575",
    },
    selButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Sizes.width * 0.025,
        height: "75%",
        borderWidth: 3,

        borderColor: "#EEEEEE",
    },
    selText: {
        fontWeight: "700",
        color: "#38A5DB",
    },


    //timelist
    timecontainer: {
        flex: 1,
        flexDirection: "column",
        width: "80%",
        marginHorizontal: "10%"
    },
    secSelContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "#EEEEEE"
    },

})