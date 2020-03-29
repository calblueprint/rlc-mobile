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
import { CheckBox } from 'react-native-elements';

export default class timeOp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.selContainer}>
                <Text style={{ ...styles.selObj, fontSize: normalize(14) }}>{this.props.text}</Text>
                <CheckBox checked={false} style={{ ...styles.selObj, paddingHorizontal: "0%" }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    selContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: "3%",
        borderBottomWidth: 2,
        borderBottomColor: "#EEEEEE"
    },
    selObj: {
        flex: 1,
        alignSelf: "center",
        paddingHorizontal: "3%",
    },
})