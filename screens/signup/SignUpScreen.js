import React, { Component } from '../../node_modules/react';
import { StyleSheet, View } from 'react-native';
import SignUp1Screen from '../../components/signup/SignUp1Screen';
import SignUp2Screen from '../../components/signup/SignUp2Screen';
import SignUp3Screen from '../../components/signup/SignUp3Screen';
import SignUp4Screen from '../../components/signup/SignUp4Screen';
import SignUp5Screen from '../../components/signup/SignUp5Screen';
import ConfirmationScreen from '../../components/signup/ConfirmationScreen'
import { postRequest } from '../../lib/requests';
import { APIRoutes } from '../../config/routes';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreenNum: 1,
            screen: null,
            user: {},
        }
    }

    updateUser = (params) => {
        for (var k in params) {
            if (params.hasOwnProperty(k)) {
               this.state.user[k] = params[k];
            }
        }
    }

    //Set initial screen as Screen 1
    componentDidMount = () => {
        this.setState({ screen: <SignUp1Screen setScreenForward={this.setScreenForward}/> });
    }

    //does post request for user registration
    userPostRequest = (params) => {
        return postRequest(
            APIRoutes.signupPath(),
            (responseData) => {
                console.log("User registraion successful.")
                console.log(responseData)
            },
            (error) => {
                console.log("Error")
            },
            params
        );
    }

    //sets up payload for user registration
    registerUser = () => {
        const params = {
            user: this.state.user
        }
        this.userPostRequest(params);
    }

    //Moves screen forward after user presses next button
    setScreenForward = (params) => {
        this.setState({ currentScreenNum: this.state.currentScreenNum + 1 });
        this.updateUser(params)
        if (this.state.currentScreenNum == 5) {
            this.registerUser()
        }
        this.renderCurrentScreen()
    }

    //Renders the appropriate screen depending on currentScreenNum
    renderCurrentScreen = () => {
        switch (this.state.currentScreenNum) {
            case 0:
                this.setState({ screen: <SignUp1Screen user={this.state.user} setScreenForward={this.setScreenForward}/> });
                break;
            case 1:
                this.setState({ screen: <SignUp2Screen user={this.state.user} setScreenForward={this.setScreenForward}/> });
                break;
            case 2:
                this.setState({ screen: <SignUp3Screen user={this.state.user} setScreenForward={this.setScreenForward}/> });
                break;
            case 3:
                this.setState({ screen: <SignUp4Screen user={this.state.user} setScreenForward={this.setScreenForward}/> });
                break;
            case 4:
                this.setState({ screen: <SignUp5Screen user={this.state.user} setScreenForward={this.setScreenForward}/> });
                break;
            case 5:
                this.setState({ screen: <ConfirmationScreen setScreenForward={this.setScreenForward}/> });
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
