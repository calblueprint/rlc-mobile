import React from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    FlatList,
    Switch,
    Image,
    TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import Styles from "../../constants/Styles";
import { normalize } from "../../utils/Normalize";
import Sizes from "../../constants/Sizes.js";

import TimeOp from "./timeOp";

const times = [
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

export default class TimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {times.map((time, i) => (<TimeOp id={i} text={time.text} value={time.value} />))}
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
});