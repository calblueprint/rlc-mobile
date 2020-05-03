import React, { Component } from '../../node_modules/react';
import { AsyncStorage, StyleSheet, View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import ProfileHeader from '../../components/profile/ProfileHeader.js';
import ProfileForm from '../../components/profile/ProfileForm.js';
import LocalStorage from '../../helpers/LocalStorage.js';
import { frontendError } from '../../lib/alerts';

import Sizes from "../../constants/Sizes.js";

import { create_availability_formData } from "../../helpers/AvailabilityHelpers.js"
import { postRequest } from '../../lib/requests';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: true,
            user: {
                'userId': "",
                'firstname': "",
                'lastname': "",
                'occupation': "",
                'telephone': "",
                'address': "",
                'city': null,
                'state': null,
                'zip_code': "",
                'email': "",
                'preferred_region_id': [],
                'preferred_location_id': [],
                'availability': ""
            },
            new_availability: {},
            password: ""
        }
    }

    async componentDidMount() {
        try {
            let user = await LocalStorage.getNonNullItem('user');
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

    changeAvailability = (new_availability) => {
        this.setState({
            new_availability: availability
        })
    } 

    saveUserInfo = async () => {
        if (this.state.password.length > 0 && this.state.password.length <= 8) {
            frontendError("Passwords must be more than 8 characters long.")
        } else {

            // Create / Update Availability if needed.
            if (Object.keys(this.state.new_availability).length != 0) {
                let avail_params = JSON.stringify(this.state.new_availability)
                await LocalStorage.storeItem('availability', avail_params);
                postRequest(APIRoutes.createAvailabilityPath(), ((availability) => {
                    this.changeUserInfo("availability", availability.id)
                }),
                (error) => console.error(error),
                avail_params
                )    
            }

            const { userId, firstName, lastName, phoneNumber, city, state, 
                zipCode, preferredRegion, preferredLocation, 
                availability, ...params } = this.state.user
            params['firstname'] = firstName
            params['lastname'] = lastName
            params['telephone'] = phoneNumber

            await LocalStorage.storeItem('user', JSON.stringify(this.state.user));
            putRequest(APIRoutes.updateUserPath(this.state.user.userId), (user => {
                Alert.alert("Successfully updated!")
            }),
            (error) => console.error(error),
            params
            )
        }
    }

    logoutUser = () => {
        const { navigate } = this.props.navigation;
        AsyncStorage.clear();
        navigate("Login");
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
                            style={{ ...styles.button, ...styles.buttonText }}
                            onPress={this.logoutUser}
                        >
                            <Text style={styles.buttonText}>Log Out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={(this.state.disabled) ? { ...styles.disabledButton, ...styles.disabledButtonText } : { ...styles.buttonText, ...styles.enabledButton }}
                            disabled={this.state.disabled}
                            onPress={() => {this.saveUserInfo;}
                        >
                            <Text style={styles.buttonText}>Save</Text>
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
        left: '10.5%',
        width: '36%',
    },
    buttonContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        height: Sizes.height * 0.1,
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
        right: '10.5%',
        width: '36%',
    },
    disabledButtonText: {
        textAlign: 'center',
        color: '#666666',
        fontWeight: '600',
        textTransform: "uppercase"
    },
    enabledButton: {
        backgroundColor: '#38A5DB',
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        width: '36%',
        right: '10.5%'
    }
});