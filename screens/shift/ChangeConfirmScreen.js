import React, { Component } from "react";
import { StyleSheet, View, Image, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import Header from "../../components/shift/Header"
import NavigationFooter from "../../navigation/NavigationFooter";

import Sizes from "../../constants/Sizes";

export default class WithdrawScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
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
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1 }}>
                    <Header
                        centerTitle={navigation.getParam('title', 'No Title')}
                        onPressBack={this.navigateToShift}
                        rightSide={false}
                        actionTitle="Withdraw"
                        onPressHandler={this.navigateToMain}
                    />
                </View>

                <View style={styles.container}>
                    <Text style={styles.overview}>
                        {navigation.getParam('description', '')}
                    </Text>
                    {navigation.getParam('hasQ', 'false') && <Text style={{ ...styles.overview, fontWeight: "400", }}>
                        {navigation.getParam('question', '')}
                    </Text>}
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            {
                                navigation.getParam('options', '').map(item => (
                                    <View key={item.key} style={styles.radioButtonContainer}>

                                        <TouchableOpacity
                                            style={styles.circle}
                                            onPress={() => this.setState({ value: item.key })} // we set our value state to key
                                        >
                                            {this.state.value === item.key && (<View style={styles.checkedCircle} />)}
                                        </TouchableOpacity>
                                        <Text style={styles.radioText}>{item.text}</Text>
                                    </View>

                                ))
                            }
                        </View>
                    </View>
                    <View style={{ flex: 5 }}></View>
                    <View style={styles.buttonContainer} >
                        <TouchableOpacity style={styles.button} onPress={this.navigateToMain}>
                            <Text style={styles.buttonText}>Confirm</Text>
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
        width: "100%",
        flex: 8,
        padding: 40,
    },
    overview: {
        fontWeight: "600",
        fontSize: 16,
        flex: .5,
        paddingVertical: 5,
    },

    button: {
        backgroundColor: '#38A5DB',
        justifyContent: 'center',
        margin: 15,
        borderRadius: 5,
        width: '100%',
        paddingLeft: 5,
        height: "50%"
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



    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        width: "100%"
    },
    radioText: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 16,
        paddingTop: 5,
    },
    circle: {
        height: Sizes.width * 0.06,
        width: Sizes.width * 0.06,
        borderRadius: Sizes.width * 0.06,
        borderWidth: Sizes.width * 0.005,
        borderColor: '#38A5DB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    checkedCircle: {
        width: Sizes.width * 0.04,
        height: Sizes.width * 0.04,
        borderRadius: Sizes.width * 0.04,
        backgroundColor: '#38A5DB',
    },
})