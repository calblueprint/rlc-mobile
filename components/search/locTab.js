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
import { Icon, SearchBar } from "react-native-elements";
import Styles from "../../constants/Styles";
import Sizes from "../../constants/Sizes.js";
import { normalize } from "../../utils/Normalize";

import TimeList from "./timeList.js";



export default class TimeTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
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
            ],
            selectedloca: [
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
                {
                    key: 'loca6',
                    text: "Bowery",
                    value: false
                },
                {
                    key: 'loca7',
                    text: "Chelsea",
                    value: false
                },

            ]
        }
    }

    getLocation = () => {

    };

    updateSearch = search => {
        this.setState({ search });
    };

    selLoc = (item) => {
        return (
            <View style={styles.selLocCont}>
                <TouchableOpacity style={styles.selLocButton}>
                    <Text style={{ ...styles.selObj, color: "white" }}>{item.text}</Text>
                    <Icon
                        name='x'
                        color='white'
                        style={styles.selObj}
                    />
                </TouchableOpacity>
            </View>

        );
    }

    // handleDelete = itemId => {
    //     const items = this.state.selectedloca.filter(item => item.key !== itemId);
    //     this.setState({ items: items });
    // };

    render() {
        const { search } = this.state;
        return (
            <KeyboardAvoidingView style={{ ...Styles.container, ...styles.container }}>
                <View style={styles.secCont}>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={search}
                        containerStyle={{
                            backgroundColor: "#EEEEEE", borderBottomColor: 'transparent',
                            borderTopColor: 'transparent'
                        }}
                        inputContainerStyle={{ backgroundColor: "#FFFFFF" }}
                    />
                </View>
                <View style={{ ...styles.secCont }}>
                    <ScrollView horizontal={true}>
                        <View style={styles.selLocCont}>
                            {this.state.selectedloca.map((loca, i) => (
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={{ ...styles.selLocButton, flexDirection: "row" }} /**onPress={this.handleDelete(loca.key)}**/>
                                        <Icon
                                            name='close'
                                            color='white'
                                            size={20}
                                        />
                                        <Text style={{ color: "white", paddingLeft: Sizes.width * 0.015 }}>{loca.text}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                    </ScrollView>

                </View>
                <View style={{ flex: 1, borderBottomColor: "#CCCCCC", borderBottomWidth: 2, width: "100%", flexDirection: "row", alignItems: "center", }}>
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
            </KeyboardAvoidingView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
    },
    secCont: {
        flex: 1,
        backgroundColor: "#EEEEEE",
        padding: "2%",
        width: "100%"
    },
    selObj: {
        flex: 1,
        alignSelf: "center",
        paddingHorizontal: "3%",
    },

    selLocCont: {
        flex: 1,
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: Sizes.width * 0.015
    },
    selLocButton: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#38A5DB",
        borderRadius: Sizes.width * 0.15,
        height: "75%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Sizes.width * 0.025
    },

})