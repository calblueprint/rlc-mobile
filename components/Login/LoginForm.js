import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default class LoginForm extends Component {
    render() {
        return (
            <View behavior="padding" style={styles.container}>
                <TextInput
                placeholder="Email" 
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                autoCorrct={false}
                ></TextInput>
                
                <TextInput 
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                ref={(input) => this.passwordInput = input}
                returnKeyType="go"
                ></TextInput>

                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 60,
        backgroundColor: '#ECEFF1',
        marginBottom: 20,
        paddingHorizontal: 10,
        color: '#000000'
    }, 
    buttonContainer: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 15,
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600'
    }
});