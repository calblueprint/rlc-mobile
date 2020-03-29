import React from "react";
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
    TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import Styles from "../../constants/Styles";
import Sizes from "../../constants/Sizes.js";
import { normalize } from "../../utils/Normalize";
import { CheckBox } from 'react-native-elements';

import TimeList from "./timeList.js";
import DayButtons from "./dayButtons.js";

export default class TimeTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }
    render() {
        return (
            <View style={{ ...Styles.container, ...styles.container }}>
                <View style={{ ...styles.selContainer, backgroundColor: "#EEEEEE" }}>
                    <Text style={{ ...styles.selObj, fontSize: normalize(14) }}>Select All Days and All Times </Text>
                    <CheckBox checked={false} style={styles.selObj} />
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView horizontal={true}>
                        <DayButtons />
                    </ScrollView>
                </View>

                <View style={{ flex: 3 }}>
                    <TimeList />
                </View>
                <View style={{ flex: 1 }} />
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

    buttonText: {

    },

})