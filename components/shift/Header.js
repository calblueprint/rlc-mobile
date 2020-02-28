import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Text, TextInput, FlatList, Switch, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import Styles from "../../constants/Styles";
import { normalize } from "../../utils/Normalize";

class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            < View style={styles.container} >
                <TouchableOpacity
                    onPress={() => {
                        this.props.onPressBack();
                    }}
                ><Icon name="arrow_back" color="#38A5DB" /></TouchableOpacity>
                <Text style={{ ...Styles.title, ...styles.title }}>{this.props.centerTitle}</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.props.onPressHandler();
                    }}
                >
                    <Text style={{ ...Styles.title, ...styles.subtitle }}>{this.props.actionTitle}</Text>
                </TouchableOpacity>
            </View >
        )

    }
}

export default Header;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        paddingTop: 50
    },
    title: {
        marginTop: "0%",
        marginBottom: "0%",
    },
    subtitle: {
        color: "#38A5DB",
        textAlign: "center",
        fontWeight: "bold",
        opacity: 0.9,
        fontSize: normalize(16)
    },
})