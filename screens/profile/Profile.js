import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Image, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import ProfileHeader from '../../components/profile/ProfileHeader.js';
import ProfileForm from '../../components/profile/ProfileForm.js';

export default class Profile extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>

            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <ProfileHeader />
                <ProfileForm />

            </KeyboardAvoidingView>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});