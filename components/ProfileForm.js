import React, { Component } from 'react';
import { StyleSheet, View, Icon, TextInput, TouchableOpacity, Text, Switch } from 'react-native';
import { isTSTypeAliasDeclaration } from '@babel/types';

export default class LoginForm extends Component {
    render() {
        return (
            <View behavior="padding" style={styles.container}>

                <Text style={styles.heading}>Basic Information 🤓</Text>

                <Text style={styles.subHeading}>First Name</ Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Melody" 
                    returnKeyType="next"
                    onSubmitEditing={() => this.lastNameInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrct={false}
                ></TextInput>

                <Text style={styles.subHeading}>Last Name</ Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Wei" 
                    returnKeyType="next"
                    ref={(input) => this.lastNameInput = input}
                    onSubmitEditing={() => this.occupationInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrct={false}
                ></TextInput>

                <Text style={styles.subHeading}>Occupation</ Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Project Leader" 
                    returnKeyType="done"
                    ref={(input) => this.occupationInput = input}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrct={false}
                ></TextInput>

                <Text style={styles.heading}>Contact Information 📱</Text>
                {/* I suggest we embed this in some sort of interactive info button; like a question mark icon  */}
                <Text style={styles.subtext}>RLC needs your complete address in order to successfully place you in the right area.</Text> 

                <Text style={styles.subHeading}>Phone Number</ Text>
                <TextInput 
                    style={styles.input}
                    placeholder="(818)-618-2966" 
                    returnKeyType="next"
                    onSubmitEditing={() => this.addressA.focus()}
                    keyboardType="phone-pad"
                    style={styles.input}
                    autoCorrct={false}
                ></TextInput>

                <Text style={styles.subHeading}>Address (Line 1)</ Text>
                <TextInput 
                    style={styles.input}
                    placeholder="2650 Haste Street" 
                    returnKeyType="next"
                    ref={(input) => this.addressA = input}
                    onSubmitEditing={() => this.addressB.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrct={false}
                ></TextInput>

                <Text style={styles.subHeading}>Address (Line 2)</ Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Wada #209A" 
                    returnKeyType="next"
                    ref={(input) => this.addressB = input}
                    onSubmitEditing={() => this.cityInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrct={false}
                ></TextInput>

                <Text style={styles.subHeading}>City</ Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Berkeley" 
                    returnKeyType="next"
                    ref={(input) => this.cityInput = input}
                    onSubmitEditing={() => this.stateInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrct={false}
                ></TextInput>

                <Text style={styles.subHeading}>State</ Text>
                <TextInput 
                    style={styles.input}
                    placeholder="CA" 
                    returnKeyType="next"
                    ref={(input) => this.stateInput = input}
                    onSubmitEditing={() => this.zipInput.focus()}
                    keyboardType="default"
                    style={styles.input}
                    autoCorrct={false}
                ></TextInput>

                <Text style={styles.subHeading}>Zip Code</ Text>
                <TextInput 
                    style={styles.input}
                    placeholder="94720" 
                    returnKeyType="done"
                    ref={(input) => this.zipInput = input}
                    keyboardType="number-pad"
                    style={styles.input}
                    autoCorrct={false}
                ></TextInput>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 40
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
    }
});