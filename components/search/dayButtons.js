//based on @source: https://dev.to/saadbashar/create-your-own-radio-button-component-in-react-native-easily-59il

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
import { normalize } from "../../utils/Normalize";
import Sizes from "../../constants/Sizes";

const options = [
    {
        key: 1,
        text: "Monday",
    },
    {
        key: 2,
        text: "Tuesday",
    },
    {
        key: 3,
        text: "Wednesday",
    },
    {
        key: 4,
        text: "Thursday",
    },
    {
        key: 5,
        text: "Friday",
    },
    {
        key: 6,
        text: "Saturday",
    },
    {
        key: 7,
        text: "Sunday",
    }
];

export default class DayButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }
    render() {
        return (
            <View style={{
                flex: 1, flexDirection: "row", padding: "2%"
            }}>
                {
                    options.map((item) => {
                        return item.key === this.state.value ?
                            <View key={item.key} style={styles.buttonContainer}>

                                <TouchableOpacity
                                    style={styles.selButton}
                                    onPress={() => this.setState({ value: item.key })} // we set our value state to key
                                >
                                    <Text style={styles.selText}>{item.text}</Text>
                                </TouchableOpacity>

                            </View>
                            :
                            <View key={item.key} style={styles.buttonContainer}>

                                <TouchableOpacity
                                    style={styles.unSelButton}
                                    onPress={() => this.setState({ value: item.key })} // we set our value state to key
                                >
                                    <Text style={styles.unSelText}>{item.text}</Text>
                                </TouchableOpacity>

                            </View>

                    })}
            </View>
        );
    }
}




const styles = StyleSheet.create({

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

})