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

export default class TimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.data.map((time, i) => (<TimeOp id={i} text={time.text} value={time.value} />))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "86%",
        marginHorizontal: "7%"
    },
});