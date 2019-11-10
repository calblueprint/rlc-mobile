import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { AuthSession } from 'expo';

import EventsList from '../../components/EventsList2.js';

export default class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>

            <View style={styles.currentEvent}>

            </View>

            <EventsList/>

            </View>
        );
    }
}

Dashboard.navigationOptions = {
    title: 'Home',
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    currentEvent: {
        backgroundColor: '#EEEEEE',
        height: '35%'
    },
    subText: {
        color: '#000000',
        fontStyle: 'italic',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'normal',
        marginTop: '27.5%',
        opacity: 0.85,
        fontSize: 16
    }, 
    eventsList: {
        flex: 1,
        height: '100%',
    }
});