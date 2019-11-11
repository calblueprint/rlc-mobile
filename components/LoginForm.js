import React, { Component } from 'react';
import { StyleSheet, View, Icon, TextInput, TouchableOpacity, Text, Switch } from 'react-native';
import { standardError, frontendError } from '../lib/alerts';
import { postRequest } from '../lib/requests';
import { APIRoutes } from '../config/routes';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
        }
    }

    //does post request for creating a new session (user login)
    fetchUser = (params) => {
        return postRequest(
            APIRoutes.loginPath(),
            (responseData) => {
                console.log("Log in successful.")
            },
            (error) => {
                if (this.state.email == "" || this.state.password == "") {
                    frontendError("There are empty fields.")
                } else {
                    this.props.setInvalidText()
                }
            },
            params
        );
    }

    //sets up payload for fetchUser
    _onPressLogin = () => {
        const params = {
            user: {
              email: this.state.email,
              password: this.state.password,
            }
        }
        this.fetchUser(params);
    }

    render() {
        return (
            <View behavior="padding" style={styles.container}>
                <TextInput
                    inlineImageLeft="mail"
                    placeholder="Email"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(text) => this.setState({email: text})}
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
                    onChangeText={(text) => this.setState({password: text})}
                    ref={(input) => this.passwordInput = input}
                    returnKeyType="go"
                ></TextInput>

                efjioerwfji

                <View style={styles.actionsContainer}>
                    <View style={{width: 150, height: 50}}>
                        <Text style={styles.rememberText}>Remember Me</Text>
                    </View>
                    <View style={{width: 150, height: 50}}>
                        <TouchableOpacity style={styles.helpLink}>
                            <Text style={styles.helpLinkText}>
                                Reset password
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.bottomSignIn}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressLogin}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    <Text style={styles.signupText}> Don't have an account?<Text style={styles.helpLinkText}> Sign Up Here</Text></Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    bottomSignIn: {
        position: 'relative',
        bottom: 20
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
    signupText: {
        height: 20,
        textAlign: 'center',
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
        fontWeight: '600'
    },
});
