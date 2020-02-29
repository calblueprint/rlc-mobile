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
                <TouchableOpacity style={styles.sides}
                    onPress={() => {
                        this.props.onPressBack();
                    }}
                >
                    <Image style={{ height: 15, width: 15, resizeMode: 'contain' }}
                        source={require("../../assets/images/back_arrow.png")}
                    />
                </TouchableOpacity>
                <Text style={{ ...styles.center, ...styles.title }}>{this.props.centerTitle}</Text>
                <TouchableOpacity style={styles.sides}
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
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        paddingTop: 50
    },
    sides: {
        width: '30%',
        textAlign: 'center'
    },
    center: {
        width: '40%',
        textAlign: 'center'
    },
    title: {
        color: "#4A4A4A",
        fontWeight: "600",
        fontSize: 20,
        marginTop: "0%",
        marginBottom: "0%",
    },
    subtitle: {
        color: "#38A5DB",
        textAlign: "center",
        fontWeight: "bold",
        opacity: 0.9,
        fontSize: normalize(15)
    },
})