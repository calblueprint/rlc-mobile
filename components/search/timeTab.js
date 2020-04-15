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
import { CheckBox } from 'react-native-elements';


export default class TimeTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        //var currDay = this.state[this.state.selectedDay]
        return (
            <View style={{ ...Styles.container, ...styles.container }}>
                <View style={{ ...styles.selContainer, backgroundColor: "#EEEEEE", paddingHorizontal: "10%" }}>
                    <Text style={{ ...styles.selObj, fontSize: normalize(14) }}>Select All Days and All Times </Text>
                    <CheckBox checked={this.props.selAllVal} style={styles.selObj} onPress={this.props.updateParentAll} />
                </View>
                <View style={{ flex: 1, borderBottomColor: "#CCCCCC", borderBottomWidth: 2, width: "100%" }}>
                    <ScrollView horizontal={true}>
                        <View style={{
                            flex: 1, flexDirection: "row", padding: "2%"
                        }}>
                            {
                                this.props.dayops.map((item) => {
                                    return item.key === this.props.selectedDay ?
                                        <View key={item.key} style={styles.buttonContainer}>

                                            <TouchableOpacity
                                                style={styles.selButton}
                                                onPress={this.props.updateSelDay} // we set our value state to key
                                            >
                                                <Text style={styles.selText}>{item.text}</Text>
                                            </TouchableOpacity>

                                        </View>
                                        :
                                        <View key={item.key} style={styles.buttonContainer}>

                                            <TouchableOpacity
                                                style={styles.unSelButton}
                                                onPress={this.props.updateSelDay} // we set our value state to key
                                            >
                                                <Text style={styles.unSelText}>{item.text}</Text>
                                            </TouchableOpacity>

                                        </View>

                                })}
                        </View>
                    </ScrollView>
                </View>

                <View style={{ flex: 6 }}>
                    <ScrollView>
                        <View style={styles.timecontainer}>

                            {Object.keys(this.props.timeops).map((time) => (
                                <View style={styles.secSelContainer}>
                                    <Text style={{ ...styles.selObj, fontSize: normalize(14) }}>{this.props.timeops[time].text}</Text>
                                    <CheckBox checked={this.props.timeops[time].value} style={{ ...styles.selObj, paddingHorizontal: "0%" }} onPress={this.props.updateParentOneTime(this.props.selectedDay, time)} />
                                </View>
                            ))}
                        </View>
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


    //day buttons
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


    //timelist
    timecontainer: {
        flex: 1,
        flexDirection: "column",
        width: "80%",
        marginHorizontal: "10%"
    },
    secSelContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "#EEEEEE"
    },

})