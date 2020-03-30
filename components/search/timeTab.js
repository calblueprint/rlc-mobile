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
import { CheckBox, ButtonGroup } from 'react-native-elements';

import TimeList from "./timeList.js";
import DayButtons from "./dayButtons.js";

export default class TimeTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: [
                {
                    key: 'all',
                    text: "Select the entire day",
                    value: false
                },
                {
                    key: '9_12',
                    text: "9AM-12PM",
                    value: false
                },
                {
                    key: '12_3',
                    text: "12PM-3PM",
                    value: false
                },
                {
                    key: '3_6',
                    text: "3PM-6PM",
                    value: false
                },
                {
                    key: '6_9',
                    text: "6PM-9PM",
                    value: false
                },
            ]
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selected) {
        this.setState({ selected })
    }

    render() {
        return (
            <View style={{ ...Styles.container, ...styles.container }}>
                <View style={{ ...styles.selContainer, backgroundColor: "#EEEEEE", paddingHorizontal: "10%" }}>
                    <Text style={{ ...styles.selObj, fontSize: normalize(14) }}>Select All Days and All Times </Text>
                    <CheckBox checked={false} style={styles.selObj} />
                </View>
                <View style={{ flex: 1, borderBottomColor: "#CCCCCC", borderBottomWidth: 2, width: "100%" }}>
                    <ScrollView horizontal={true}>
                        <DayButtons />
                    </ScrollView>
                </View>

                <View style={{ flex: 6 }}>
                    <ScrollView>
                        <TimeList data={this.state.times} />
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

})