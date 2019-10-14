import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import ProfileHeader from '../../components/profile/ProfileHeader.js';
import ProfileForm from '../../components/profile/ProfileForm.js';

export default class Profile extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                {/* <View style={styles.header}>
                    <Text style={styles.headerText}>Profile</Text>
                </View> */}

                <ScrollView>
                    <ProfileHeader />
                    <ProfileForm />
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>

        );
    }
}

Profile.navigationOptions = {
    title: 'My Profile',
  };

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        marginBottom: 20,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        width: 250,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 50
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600',
        textTransform: "uppercase"
    }
});