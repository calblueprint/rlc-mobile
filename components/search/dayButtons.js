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
            <View style={{ flex: 1, flexDirection: "row" }}>
                {
                    options.map(item => (
                        <View key={item.key} style={styles.buttonContainer}>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.setState({ value: item.key })} // we set our value state to key
                            >
                                <Text style={styles.overview}>{item.text}</Text>
                                {this.state.value === item.key && (<View style={styles.checkedCircle} />)}
                            </TouchableOpacity>

                        </View>

                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: "1%",
        width: Sizes.width * 0.3
    },
    overview: {
        flex: 1,
        fontSize: 16,
        paddingTop: 5,
    },
    button: {
        height: Sizes.width * 0.07,
        width: Sizes.width * 0.3,
        borderColor: '#38A5DB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    checkedCircle: {
        width: Sizes.width * 0.04,
        height: Sizes.width * 0.04,
        borderRadius: Sizes.width * 0.04,
        backgroundColor: '#38A5DB',
    },
})