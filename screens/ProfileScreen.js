import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import ProfileHeader from '../components/profile/ProfileHeader';
import BasicInfoForm from '../components/profile/BasicInfoForm';
import ContactInfoForm from '../components/profile/ContactInfoForm';
import AccountDetailsForm from '../components/profile/AccountDetailsForm';
import EventPreferencesForm from '../components/profile/AccountDetailsForm';


export default class ProfileScreen extends Component {
    render() {
        return (
            <ScrollView>
                 <ProfileHeader />
                 <BasicInfoForm />
                 <ContactInfoForm />
                 <AccountDetailsForm />
                 <EventPreferencesForm />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    
})