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
import { CheckBox } from 'react-native-elements';


export default class TimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.data.map((time, i) => (
                    <View style={styles.selContainer}>
                        <Text style={{ ...styles.selObj, fontSize: normalize(14) }}>{time.text}</Text>
                        <CheckBox checked={false} style={{ ...styles.selObj, paddingHorizontal: "0%" }} />
                    </View>))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "80%",
        marginHorizontal: "10%"
    },
    selContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "#EEEEEE"
    },
    selObj: {
        flex: 1,
        alignSelf: "center",
        paddingHorizontal: "3%",
    },
});