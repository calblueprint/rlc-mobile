import React, { Component } from '../../node_modules/react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import SignUp1Screen from '../../components/signup/SignUp1Screen';
import SignUp2Screen from '../../components/signup/SignUp2Screen';
import SignUp3Screen from '../../components/signup/SignUp3Screen';
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

    navigateToHome = () => {
        const { navigate } = this.props.navigation;
        navigate("Logo");
    };

    updateUser = (params) => {
        for (var k in params) {
            if (params.hasOwnProperty(k)) {
                this.state.user[k] = params[k];
            }
        }
    }

    //Set initial screen as Screen 1
    componentDidMount = () => {
        this.setState({ screen: <SignUp1Screen user={this.state.user} setScreenForward={this.setScreenForward} setScreenBackward={this.setScreenBackward} previousUserInfo={this.state.user} /> });
    }

    //does post request for user registration
    userPostRequest = (params) => {
        return postRequest(
            APIRoutes.signupPath(),
            (responseData) => {
                console.log("User registration successful.")
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

    createUserForStorage = () => {
        const user = {
            // TODO: Create a new userId on RLC website
            'userId': 5,
            'firstName': this.state.user.firstname,
            'lastName': this.state.user.lastname,
            'occupation': '',
            'phoneNumber': this.state.user.telephone,
            'address': '',
            'city': '',
            'state': '',
            'zipCode': '',
            'email': this.state.user.email,
            'preferredRegion': this.state.user.preferredRegion,
            'preferredLocation': this.state.user.preferredLocation,
            'preferredTimes': this.state.user.preferredTimes
        }
        this._asyncSignIn(user)
    }

    _asyncSignIn = async (user) => {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        this.props.navigation.navigate("Dashboard")
    }

    //Moves screen forward after user presses next button
    setScreenForward = (params) => {
        this.setState({ currentScreenNum: this.state.currentScreenNum + 1 }, () => { this.renderCurrentScreen() });
        this.updateUser(params)
        if (this.state.currentScreenNum == 4) {
            this.registerUser()
        }
        this.renderCurrentScreen()
    }

    //Moves to previous screen in sign up after user presses previous button
    setScreenBackward = (params) => {
        this.setState({ currentScreenNum: this.state.currentScreenNum - 1 }, () => { this.renderCurrentScreen() });
        this.updateUser(params)
        this.renderCurrentScreen()
    }

    //Renders the appropriate screen depending on currentScreenNum
    renderCurrentScreen = () => {
        switch (this.state.currentScreenNum) {
            case 1:
                this.setState({ screen: <SignUp1Screen user={this.state.user} setScreenForward={this.setScreenForward} setScreenBackward={this.setScreenBackward} previousUserInfo={this.state.user} /> });
                break;
            case 2:
                this.setState({ screen: <SignUp2Screen user={this.state.user} setScreenForward={this.setScreenForward} setScreenBackward={this.setScreenBackward} previousUserInfo={this.state.user} /> });
                break;
            case 3:
                this.setState({ screen: <SignUp3Screen user={this.state.user} setScreenForward={this.setScreenForward} setScreenBackward={this.setScreenBackward} previousUserInfo={this.state.user} createUserForStorage={this.createUserForStorage} /> });
                break;
            case 4:
                this.setState({ screen: <ConfirmationScreen setScreenForward={this.setScreenForward} navigateToHome={this.navigateToHome} /> });
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

SignUpScreen.navigationOptions = {
    title: "Sign Up"
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
