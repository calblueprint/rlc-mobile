import * as WebBrowser from '../../node_modules/expo-web-browser';
import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';

import SignUp1Screen from '../../components/signup/SignUp1Screen';
import SignUp2Screen from '../../components/signup/SignUp2Screen';
import SignUp3Screen from '../../components/signup/SignUp3Screen';
import SignUp4Screen from '../../components/signup/SignUp4Screen';


export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreenNum: 1,
            screen: null,
        }
    }

    //Set initial screen as Screen 1
    componentDidMount = () => {
        this.setState({ screen: <SignUp1Screen setScreenForward={this.setScreenForward}/> });
    }

    //Moves screen forward after user presses next button
    setScreenForward = () => {
        this.setState({ currentScreenNum: this.state.currentScreenNum + 1 });
        this.renderCurrentScreen()
    }

    //Renders the appropriate screen depending on currentScreenNum
    renderCurrentScreen = () => {
        switch (this.state.currentScreenNum) {
            case 0:
                this.setState({ screen: <SignUp1Screen setScreenForward={this.setScreenForward}/> });
                break;
            case 1:
                this.setState({ screen: <SignUp2Screen setScreenForward={this.setScreenForward}/> });
                break;
            case 2:
                this.setState({ screen: <SignUp3Screen setScreenForward={this.setScreenForward}/> });
                break;
            case 3:
                this.setState({ screen: <SignUp4Screen setScreenForward={this.setScreenForward}/> });   
                break;
            case 4:
                this.setState({ screen: <SignUp5Screen setScreenForward={this.setScreenForward}/> });   
                break;
        }
    }

    render() {
        return (
            <View style={styles.formContainer}>
                {this.state.screen}
            </View>
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
        color: '#ff0000',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'normal',
        opacity: 0.85,
        fontSize: 16
    }
})
