import React, { Component } from '../../node_modules/react';
import { AsyncStorage, StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import ProfileHeader from '../../components/profile/ProfileHeader.js';
import ProfileForm from '../../components/profile/ProfileForm.js';
import LocalStorage from '../../helpers/LocalStorage.js';
import { frontendError } from '../../lib/alerts';

import Sizes from "../../constants/Sizes.js";

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: true,
            user: {
                'userId': "",
                'firstName': "",
                'lastName': "",
                'occupation': "",
                'phoneNumber': "",
                'address': "",
                'city': null,
                'state': null,
                'zipCode': "",
                'email': "",
                'preferredRegion': [],
                'preferredLocation': [],
                'preferredTimes': []
            },
            password: ""
        }
    }

    async componentDidMount() {
        try {
            let user = await LocalStorage.getItem('user');
            this.setState({ user: user }, () => { this.render() });
        } catch (err) {
            console.error(err)
            this.props.navigation.navigate("Login")
        }
    }

    enableSaveButton = () => {
        if (this.state.disabled) {
            this.setState({ disabled: false })
        }
    }

    changeUserInfo = (attribute, text) => {
        this.setState({ [attribute]: text });
    }

    getUserAttribute = (attribute) => {
        return this.state.user[attribute];
    }

    saveUserInfo = async () => {
        if (this.state.password.length > 0 && this.state.password.length <= 8) {
            frontendError("Passwords must be more than 8 characters long.")
        } else {
            await LocalStorage.storeItem('user', JSON.stringify(this.state.user));
        }
    }

    logoutUser = () => {
        const { navigate } = this.props.navigation;
        AsyncStorage.clear();
        navigate("Logo");
    }

    render() {
        if (!this.props.user) {
            return (
                <KeyboardAvoidingView behavior="padding" style={styles.container}>

                    <ScrollView>
                        <ProfileHeader getUserAttribute={this.getUserAttribute} />
                        <ProfileForm previousUserInfo={this.state.user} getUserAttribute={this.getUserAttribute} enableSaveButton={this.enableSaveButton} changeUserInfo={this.changeUserInfo} />
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={(this.state.disabled) ? { ...styles.disabledButton, ...styles.disabledButtonText } : { ...styles.button, ...styles.buttonText, ...styles.enabledButton }}
                            disabled={this.state.disabled}
                            onPress={this.saveUserInfo}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.button, ...styles.buttonText }}
                            onPress={this.logoutUser}
                        >
                            <Text style={styles.buttonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>

            );
        }

    }
}

Profile.navigationOptions = {
    title: 'My Profile',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Sizes.width
    },
    header: {
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: '600',
        textTransform: "uppercase"
    },
    button: {
        backgroundColor: '#38A5DB',
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        right: 40,
        width: 135,
    },
    buttonContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        height: 50,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600',
        textTransform: "uppercase"
    },
    disabledButton: {
        opacity: 0.4,
        backgroundColor: '#CCCCCC',
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        left: 40,
        width: 135,
    },
    disabledButtonText: {
        textAlign: 'center',
        color: '#666666',
        fontWeight: '600',
        textTransform: "uppercase"
    },
    enabledButton: {
        left: 40
    }
});