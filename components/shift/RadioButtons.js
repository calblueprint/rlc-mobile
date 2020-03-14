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
        key: 'one',
        text: 'Withdraw from this event only',
    },
    {
        key: 'all',
        text: 'Withdraw from this and all future events',
    }
];

export default class RadioButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }
    render() {
        return (
            <View>
                {
                    options.map(item => (
                        <View key={item.key} style={styles.buttonContainer}>

                            <TouchableOpacity
                                style={styles.circle}
                                onPress={() => this.setState({ value: item.key })} // we set our value state to key
                            >
                                {this.state.value === item.key && (<View style={styles.checkedCircle} />)}
                            </TouchableOpacity>
                            <Text style={styles.overview}>{item.text}</Text>
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
        marginVertical: 5,
        width: "100%"
    },
    overview: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        lineHeight: 25,
        paddingTop: 5,
    },
    circle: {
        height: 25,
        width: 25,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#38A5DB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    checkedCircle: {
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: '#38A5DB',
    },
})