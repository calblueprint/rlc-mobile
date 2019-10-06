import React, { Component } from 'react';
import { StyleSheet, View, Icon, TextInput, TouchableOpacity, Text, Switch } from 'react-native';

export default class LoginForm extends Component {
    render() {
        return (
            <View behavior="padding" style={styles.container}>
                <TextInput
                inlineImageLeft="mail"
                placeholder="Email" 
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                autoCorrct={false}
                ></TextInput>
                
                <TextInput 
                inlineImageLeft="lock"
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                ref={(input) => this.passwordInput = input}
                returnKeyType="go"
                ></TextInput>

                <View style={styles.actionsContainer}>                    
                    <View style={{width: 150, height: 50}}>
                        <Switch/><Text style={styles.rememberText}>Remember Me</Text>
                    </View>
                    <View style={{width: 150, height: 50}}>
                        <TouchableOpacity style={styles.helpLink}>
                            <Text style={styles.helpLinkText}>
                                Reset password
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Text> Don't have an account?<Text style={styles.helpLinkText}> Sign Up Here</Text></Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        height: 80
    },
    input: {
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#3b3b3b',
        color: '#000000',
    }, 
    buttonContainer: {
        backgroundColor: '#38A5DB',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600'
    },
    rememberText: {
        textAlign: 'left',
        textAlignVertical: 'top'
    },
    inputIcon: {
        color: "#FFFFFF",
    },
    helpLink: {
    paddingVertical: 15,
    },
    helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
    },
});