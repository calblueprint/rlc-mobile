import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Styles from "../constants/Styles.js"
// Default template for creating new screens and components in React Native.


class OnboardingScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    navigateToLogin = () => {
        const { navigate } = this.props.navigation;
        navigate("Login");
    }

    navigateToSignup = () => {
        const { navigate } = this.props.navigation;
        navigate("Signup");
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ ...styles.container, ...Styles.container }}>
                <Text>Open up App.js to start working on your app!</Text>
                <TouchableOpacity style={Styles.button} onPress={this.navigateToLogin}>
                    <Text style={Styles.buttonText}>Go to Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...Styles.button, ...styles.button }} onPress={this.navigateToSignup}>
                    <Text style={{ ...Styles.buttonText, ...styles.buttonText }}>Signup</Text>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#fff",
        borderColor: "#38A5DB",
        borderWidth: 2
    },
    buttonText: {
        color: "#38A5DB"
    }

});

export default OnboardingScreen;
