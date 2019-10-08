import * as WebBrowser from '../../node_modules/expo-web-browser';
import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';

import LoginForm from '../../components/LoginForm.js';

export default class Login extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}> 
                <View style={styles.logoContainer}>
                    <Image 
                    style={styles.logo}
                    source={require('../../assets/images/rlclogo.png')}/>
                    <Text style={styles.title}>Let's rescue some food 👍</Text>
                    <Text style={styles.subtext}>Please log in to continue</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }, 
    formContainer: {
        height: '100%'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginTop: 40,
        maxHeight: 200
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#000000',
        marginTop: 30,
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
})