import React, { Component } from 'react';
import { Platform, StyleSheet, View, Icon, TextInput, TouchableOpacity, Text } from 'react-native';
import { isTSTypeAliasDeclaration } from '@babel/types';

export default class ProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'userId': "",
            'firstName': "",
            'lastName': "",
            'occupation': "",
            'phoneNumber': "",
            'address': "",
            'city': null,
            'state': null,
            'zipCode': "",
            'email': "",
            'preferredRegion': "",
            'preferredLocation': "",
            'preferredTimes': null
        }
    }

    render() {
        return (
            <View behavior="padding" style={styles.container}>

                <Text style={styles.heading}>Basic Information 🤓</Text>

                <Text style={styles.subHeading}>First Name</ Text>
                <TextInput
                    style={styles.input}
                    defaultValue={this.props.getUserAttribute('firstName')}
                    onChangeText={text => { this.props.changeUserInfo('firstName', text); this.props.enableSaveButton(); }}
                    returnKeyType="next"
                    onSubmitEditing={() => this.lastNameInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>Last Name</ Text>
                <TextInput
                    style={styles.input}
                    defaultValue={this.props.getUserAttribute('lastName')}
                    onChangeText={text => { this.props.changeUserInfo('lastName', text); this.props.enableSaveButton(); }}
                    returnKeyType="next"
                    ref={(input) => this.lastNameInput = input}
                    onSubmitEditing={() => this.occupationInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>Occupation</ Text>
                <TextInput
                    style={styles.input}
                    defaultValue={this.props.getUserAttribute('occupation')}
                    onChangeText={text => { this.props.changeUserInfo('occupation', text); this.props.enableSaveButton(); }}
                    returnKeyType="done"
                    ref={(input) => this.occupationInput = input}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.heading}>Contact Information 📱</Text>
                {/* I suggest we embed this in some sort of interactive info button; like a question mark icon  */}
                <Text style={styles.subtext}>RLC needs your complete address in order to successfully place you in the right area.</Text>

                <Text style={styles.subHeading}>Phone Number</ Text>
                <TextInput
                    style={styles.input}
                    defaultValue={this.props.getUserAttribute('phoneNumber')}
                    onChangeText={text => { this.props.changeUserInfo('phoneNumber', text); this.props.enableSaveButton(); }}
                    returnKeyType="next"
                    onSubmitEditing={() => this.addressA.focus()}
                    keyboardType="phone-pad"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>Address (Line 1)</ Text>
                <TextInput
                    style={styles.input}
                    defaultValue={this.props.getUserAttribute('address')}
                    onChangeText={text => { this.props.changeUserInfo('address', text); this.props.enableSaveButton(); }}
                    returnKeyType="next"
                    ref={(input) => this.addressA = input}
                    onSubmitEditing={() => this.addressB.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>Address (Line 2)</ Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    returnKeyType="next"
                    ref={(input) => this.addressB = input}
                    onSubmitEditing={() => this.cityInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>City</ Text>
                <TextInput
                    style={styles.input}
                    defaultValue={this.props.getUserAttribute('city')}
                    onChangeText={text => { this.props.changeUserInfo('city', text); this.props.enableSaveButton(); }}
                    returnKeyType="next"
                    ref={(input) => this.cityInput = input}
                    onSubmitEditing={() => this.stateInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>State</ Text>
                <TextInput
                    style={styles.input}
                    defaultValue={this.props.getUserAttribute('state')}
                    onChangeText={text => { this.props.changeUserInfo('state', text); this.props.enableSaveButton(); }}
                    returnKeyType="next"
                    ref={(input) => this.stateInput = input}
                    onSubmitEditing={() => this.zipInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>Zip Code</ Text>
                <TextInput
                    style={styles.input}
                    defaultValue={this.props.getUserAttribute('zipCode')}
                    onChangeText={text => { this.props.changeUserInfo('zipCode', text); this.props.enableSaveButton(); }}
                    returnKeyType="done"
                    ref={(input) => this.zipInput = input}
                    keyboardType="number-pad"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                {/* Account Details */}
                <Text style={styles.heading}>
                    Account Details ⚙️
                </Text>

                <Text style={styles.subHeading}>
                    Email
                </Text>
                <TextInput
                    defaultValue={this.props.getUserAttribute('email')}
                    onChangeText={text => { this.props.changeUserInfo('email', text); this.props.enableSaveButton(); }}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>
                    Password
                </Text>
                <TextInput
                    inlineImageLeft="lock"
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                    returnKeyType="go"
                ></TextInput>

                <View style={{ width: 150, height: 50 }}>
                    <TouchableOpacity style={styles.helpLink}>
                        <Text style={styles.helpLinkText}>
                            Reset password
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.heading}>
                    Event Preferences 🍎
                    </Text>

                <Text style={styles.subHeading}>
                    Preferred Region
                    </Text>
                <TextInput
                    defaultValue={this.props.getUserAttribute('preferredRegion')}
                    onChangeText={text => { this.props.changeUserInfo('preferredRegion', text); this.props.enableSaveButton(); }}
                    returnKeyType="next"
                    onSubmitEditing={() => this.preferredLocationInput.focus()}
                    autoCapitalize="none"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>
                    Preferred Locations (Optional)
                    </Text>
                <TextInput
                    defaultValue={this.props.getUserAttribute('preferredLocation')}
                    onChangeText={text => { this.props.changeUserInfo('preferredLocation', text); this.props.enableSaveButton(); }}
                    returnKeyType="next"
                    onSubmitEditing={() => this.preferredTimeInput.focus()}
                    ref={(input) => this.preferredLocationInput = input}
                    autoCapitalize="none"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

                <Text style={styles.subHeading}>
                    Preferred Times (Optional)
                    </Text>
                <TextInput
                    defaultValue={this.props.getUserAttribute('preferredTimes')}
                    onChangeText={text => { this.props.changeUserInfo('preferredTimes', text); this.props.enableSaveButton(); }}
                    returnKeyType="done"
                    ref={(input) => this.preferredTimeInput = input}
                    autoCapitalize="none"
                    autoCapitalize="none"
                    style={styles.input}
                    autoCorrect={false}
                ></TextInput>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        paddingTop: 20,
    },
    input: {
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#3b3b3b',
        color: '#000000',
    },
    heading: {
        color: '#000000',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'left',
        fontWeight: '600',
        opacity: 0.9,
        fontSize: 20
    },
    subHeading: {
        color: '#000000',
        marginTop: 10,
        textAlign: 'left',
        fontWeight: '600',
        opacity: 0.9,
        fontSize: 14
    },
    subtext: {
        color: '#757575',
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'left',
        fontWeight: 'normal',
        fontStyle: 'italic',
        opacity: 0.85,
        fontSize: 14
    },
    button: {
        backgroundColor: '#38A5DB',
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        width: 250,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '600',
        textTransform: "uppercase"
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
        fontWeight: '600'
    },
})