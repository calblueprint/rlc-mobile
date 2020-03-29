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

import TimeList from "./timeList.js";



export default class TimeTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loca: [
                {
                    key: 'loca1',
                    text: "Bowery",
                    value: false
                },
                {
                    key: 'loca2',
                    text: "Chelsea",
                    value: false
                },
                {
                    key: 'loca3',
                    text: "Chinatown",
                    value: false
                },
                {
                    key: 'loca5',
                    text: "Clinton",
                    value: false
                },
            ]
        }
    }

    getLocation = () => {

    };

    render() {

        return (
            <KeyboardAvoidingView style={{ ...Styles.container, ...styles.container }}>
                <View style={{ flex: 1, backgroundColor: "#EEEEEE" }}>

                </View>
                <View style={{ borderBottomColor: "#CCCCCC", borderBottomWidth: 2, width: "100%", flex: 1, flexDirection: "row", alignItems: "center", }}>
                    <TouchableOpacity style={{
                        width: "80%", margin: "10%", flex: 1, flexDirection: "row", alignItems: "center",
                    }}
                        onPress={this.getLocation} >
                        <Icon
                            name='location-searching'
                            color='#517fa4'
                            style={styles.selObj} />
                        <Text style={{ ...styles.selObj, fontSize: normalize(15) }}> Current Location</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 7 }}>
                    <ScrollView>
                        <TimeList data={this.state.loca} />
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
    },
    selObj: {
        flex: 1,
        alignSelf: "center",
        paddingHorizontal: "3%",
    },


})