import React, { Component } from 'react';
import { StyleSheet, View, Icon, TextInput, TouchableOpacity, Text, Switch, Image } from 'react-native';

export default class LoginForm extends Component {
    render() {
        return (
            <View style={styles.profileContainer}>
                <Image 
                style={styles.profilePic}
                source={require('../../assets/images/rlcprofilepic.png')} />

                <Text style={styles.title}>Melody Wei</Text>
                <Text style={styles.subtext}>Member since September 2019</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginTop: 25,
        maxHeight: 170 // change this to be dynamic
    },
    profilePic: {
        width: 125,
        height: 125,
        borderRadius: 125/2
    }, 
    title: {
        color: '#000000',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        opacity: 0.9,
        fontSize: 22
    },
    subtext: {
        color: '#000000',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'normal',
        opacity: 0.85,
        fontSize: 16
    }
});