// Place Holder for Search Feature
import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Sizes from "../../constants/Sizes.js";
import Styles from '../../constants/Styles';
import Colors from '../../constants/Colors';

import TimeOrLoc from '../../components/search/timeOrLoc.js';

export default class Search extends Component {
    search = () => {
    }
    render() {
        return (
            <View style={{ ...Styles.container, ...styles.container }}>
                <View style={styles.header}>
                    <Text style={Styles.title}>Search for an Event </Text>
                </View>
                <View style={{ flex: 12 }}>
                    <TimeOrLoc />
                </View>
                <View style={{ flex: 1, marginHorizontal: "10%", marginVertical: "3%" }}>
                    <TouchableOpacity
                        style={{ ...styles.button, ...styles.buttonText }}
                        onPress={this.search}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: "5%",
        flex: 1,
        flexDirection: "column",
        alignContent: "space-around",
        width: Sizes.width,
    },
    header: {
        flex: 1,
        marginHorizontal: "10%",
        //borderBottomWidth: 2,
        //borderBottomColor: Colors.tabIconDefault,
    },
    button: {
        backgroundColor: '#38A5DB',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 50,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600',
        textTransform: "uppercase"
    },

})
