import React, { Component } from "../../node_modules/react";
import { StyleSheet, View, Image, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Header from "../../components/shift/Header"
import Sizes from "../../constants/Sizes";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navigateToMain = () => {
        const { navigate } = this.props.navigation;
        navigate("Main");
    };

    navigateToShift = () => {
        const { navigate } = this.props.navigation;
        navigate("Shift");
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="position">
                <View style={{ height: '10%' }}>
                    <Header
                        centerTitle="Withdraw Your Spot"
                        onPressBack={this.navigateToShift}
                        rightSide={false}
                        actionTitle="Withdraw"
                        onPressHandler={this.navigateToMain}
                    />
                </View>
                <ScrollView style={{ height: '90%' }}>
                    <View style={styles.container}>
                        <Text style={styles.overview}>
                            You are about to withdraw your spot from a recurring event.
                                </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Complete</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        padding: 40,
        paddingTop: 20,
    },
    overview: {
        fontSize: 16,
        lineHeight: 25,
        letterSpacing: .5,
        paddingTop: 5,
    },
    button: {
        backgroundColor: '#38A5DB',
        justifyContent: 'center',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 5,
        width: '100%',
        height: 50
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center',
        flex: 1,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
        textTransform: "uppercase"
    },
})