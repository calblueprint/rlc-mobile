import React, { Component } from 'react';
import { Platform, StyleSheet, View, Icon, TextInput, TouchableOpacity, Text } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { isTSTypeAliasDeclaration } from '@babel/types';

const regions = [{
    name: "Albany, NY"
}, {
    name: "Amarillo, TX"
}, {
    name: "New York City, NY"
}, {
    name: "San Francisco, CA"
}, {
    name: "Washington DC"
}
]

const locations = [{
    name: "Battery Park City"
}, {
    name: "Bowery"
}, {
    name: "Carnegie Hall"
}, {
    name: "Chelsea"
}, {
    name: "Chinatown"
}, {
    name: "Civic Center"
}, {
    name: "Clinton"
}, {
    name: "East Harlem"
}
]

const daysandtimes = [{
    name: "Select all times",
    id: 0,
    times: []
}, {
    name: "Monday",
    id: 1,
    times: [{ name: "9am to 12pm", id: 2 }, { name: "12pm to 4pm", id: 3 }, { name: "4pm to 8pm", id: 4 }, { name: "8pm to 12 am", id: 5 }]
}, {
    name: "Tuesday",
    id: 6,
    times: [{ name: "9am to 12pm", id: 7 }, { name: "12pm to 4pm", id: 8 }, { name: "4pm to 8pm", id: 9 }, { name: "8pm to 12 am", id: 10 }]
}, {
    name: "Wednesday",
    id: 11,
    times: [{ name: "9am to 12pm", id: 12 }, { name: "12pm to 4pm", id: 13 }, { name: "4pm to 8pm", id: 14 }, { name: "8pm to 12 am", id: 15 }]
}, {
    name: "Thursday",
    id: 16,
    times: [{ name: "9am to 12pm", id: 17 }, { name: "12pm to 4pm", id: 18 }, { name: "4pm to 8pm", id: 19 }, { name: "8pm to 12 am", id: 20 }]
}, {
    name: "Friday",
    id: 21,
    times: [{ name: "9am to 12pm", id: 22 }, { name: "12pm to 4pm", id: 23 }, { name: "4pm to 8pm", id: 24 }, { name: "8pm to 12 am", id: 25 }]
}, {
    name: "Saturday",
    id: 26,
    times: [{ name: "9am to 12pm", id: 27 }, { name: "12pm to 4pm", id: 28 }, { name: "4pm to 8pm", id: 29 }, { name: "8pm to 12 am", id: 30 }]
}, {
    name: "Sunday",
    id: 31,
    times: [{ name: "9am to 12pm", id: 32 }, { name: "12pm to 4pm", id: 33 }, { name: "4pm to 8pm", id: 34 }, { name: "8pm to 12 am", id: 35 }]
}
]

const colors = {
    primary: "#38A5DB",
}

export default class ProfileForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            preferredRegion: [],
            preferredLocation: [],
            preferredTimes: [],
        }
    }

    componentDidMount = () => {
        if (this.props.getUserAttribute('preferredRegion') != null) {
            this.setState({ preferredRegion: this.props.getUserAttribute('preferredRegion') })
        }
        if (this.props.getUserAttribute('preferredLocation') != null) {
            this.setState({ preferredLocation: this.props.getUserAttribute('preferredLocation') })
        }
        if (this.props.getUserAttribute('preferredTimes') != null) {
            this.setState({ preferredTimes: this.props.getUserAttribute('preferredTimes') })
        }
    }

    onPreferredRegionChange = (preferredRegion) => {
        this.setState({ preferredRegion });
    }

    onPreferredLocationChange = (preferredLocation) => {
        this.setState({ preferredLocation });
    }

    onPreferredTimesChange = (preferredTimes) => {
        this.setState({ preferredTimes });
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
                    onChangeText={text => { this.props.changeUserInfo('password', text); this.props.enableSaveButton(); }}
                    secureTextEntry
                    style={styles.input}
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
                <SectionedMultiSelect
                    single
                    colors={colors}
                    selectedItems={this.state.preferredRegion}
                    items={regions}
                    uniqueKey="name"
                    onSelectedItemsChange={preferredRegion => { this.props.changeUserInfo('preferredRegion', preferredRegion); this.props.enableSaveButton(); }}
                    searchPlaceholderText="Search regions..."
                    searchInputStyle={styles.input}
                    modalWithSafeAreaView={true}
                    submitButtonText="Select"
                    confirmText="SAVE"
                    styles={{
                        selectToggle: { borderBottomWidth: 1, marginBottom: 20, height: 40 },
                        selectToggleText: { fontSize: 14, color: "#333333" }
                    }}
                />

                <Text style={styles.subHeading}>
                    Preferred Locations (Optional)
                    </Text>
                <SectionedMultiSelect
                    colors={colors}
                    selectedItems={this.state.preferredLocation}
                    items={locations}
                    uniqueKey="name"
                    onSelectedItemsChange={preferredLocation => { this.props.changeUserInfo('preferredLocation', preferredLocation); this.props.enableSaveButton(); }}
                    showChips={false}
                    searchPlaceholderText="Search locations..."
                    searchInputStyle={styles.input}
                    modalWithSafeAreaView={true}
                    submitButtonText="Select"
                    confirmText="SAVE"
                    styles={{
                        selectToggle: { borderBottomWidth: 1, marginBottom: 20, height: 40 },
                        selectToggleText: { fontSize: 14, color: "#333333" }
                    }}
                />

                <Text style={styles.subHeading}>
                    Preferred Times (Optional)
                    </Text>
                <SectionedMultiSelect
                    hideSearch
                    colors={colors}
                    selectedItems={this.state.preferredTimes}
                    items={daysandtimes}
                    uniqueKey="id"
                    expandDropDowns={true}
                    onSelectedItemsChange={preferredTimes => { this.props.changeUserInfo('preferredTimes', preferredTimes); this.props.enableSaveButton(); }}
                    subKey="times"
                    showChips={false}
                    searchInputStyle={styles.input}
                    modalWithSafeAreaView={true}
                    submitButtonText="Select"
                    confirmText="SAVE"
                    styles={{
                        selectToggle: { borderBottomWidth: 1, marginBottom: 20, height: 40 },
                        selectToggleText: { fontSize: 14, color: "#333333" }
                    }}
                />

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