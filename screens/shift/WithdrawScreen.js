import React, { Component } from "react";
import { StyleSheet, View, Image, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Header from "../../components/shift/Header"
import Sizes from "../../constants/Sizes";
import NavigationFooter from "../../navigation/NavigationFooter";
import RadioButtons from "../../components/shift/RadioButtons";


export default class WithdrawScreen extends React.Component {
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
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1 }}>
                    <Header
                        centerTitle="Withdraw Your Spot"
                        onPressBack={this.navigateToShift}
                        rightSide={false}
                        actionTitle="Withdraw"
                        onPressHandler={this.navigateToMain}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.overview}>
                        You are about to withdraw your spot from a recurring event.
                                </Text>
                    <View style={{ flex: 1 }}>
                        <RadioButtons />
                    </View>
                    <View style={{ flex: 4 }}></View>
                    <View style={styles.buttonContainer} >
                        <TouchableOpacity style={styles.button} onPress={this.navigateToMain}>
                            <Text style={styles.buttonText}>Complete</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: Sizes.width,
        flex: 8,
        padding: 40,
        paddingTop: 20,
    },
    overview: {
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 25,
        paddingVertical: 5,
    },
    button: {
        backgroundColor: '#38A5DB',
        justifyContent: 'center',
        margin: 15,
        marginBottom: 20,
        borderRadius: 5,
        width: '100%',
        paddingLeft: 5,
        height: 50
    },
    buttonContainer: {
        alignItems: 'center',
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