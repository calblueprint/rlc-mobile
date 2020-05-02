//radio buttons based on @source: https://dev.to/saadbashar/create-your-own-radio-button-component-in-react-native-easily-59il

import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Header from "../../components/shift/Header"
import NavigationFooter from "../../navigation/NavigationFooter";

import Sizes from "../../constants/Sizes";
import { normalize } from "../../utils/Normalize";
import Colors from "../../constants/Colors";
import { getRequest } from "../../lib/requests";

export default class ChangeConfirmScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }


    navigateToMain = () => {
        const { navigate } = this.props.navigation;
        const { navigation } = this.props;
        const event_id = navigation.getParam('event_id','');
        getRequest(`events/attend/${event_id}/attend`, 
        responseData => {
            console.log("succesfull");
            console.log(responseData);
            navigate("Main");
        },
        error => {
            console.log(error);
            console.log("errrrrr");
        });
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
        flex: 5,
        padding: 40,
    },
    overview: {
        fontWeight: "600",
        fontSize: normalize(16),
        flex: 1,
        paddingVertical: 5,
    },

    button: {
        backgroundColor: Colors.mainBlue,
        justifyContent: 'center',
        margin: "0.5%",
        borderRadius: 5,
        width: '100%',
        height: Sizes.height * 0.06
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.buttonText,
        fontWeight: '600',
        fontSize: normalize(16),
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
        fontSize: normalize(14),
        paddingTop: 5,
    },
    circle: {
        height: Sizes.width * 0.06,
        width: Sizes.width * 0.06,
        borderRadius: Sizes.width * 0.06,
        borderWidth: Sizes.width * 0.005,
        borderColor: Colors.mainBlue,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    checkedCircle: {
        width: Sizes.width * 0.04,
        height: Sizes.width * 0.04,
        borderRadius: Sizes.width * 0.04,
        backgroundColor: Colors.mainBlue,
    },
})