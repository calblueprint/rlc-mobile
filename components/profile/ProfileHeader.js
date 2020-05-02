import React, { Component } from 'react';
import { StyleSheet, View, Icon, Text, Image } from 'react-native';

export default class ProfileHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profilePic}
                        source={require('../../assets/images/rlclogo.png')} />

                    <Text style={styles.title}>{this.props.getUserAttribute('firstname') + " " + this.props.getUserAttribute('lastname')}</Text>
                    <Text style={styles.subtext}>Member since September 2019</Text>
                </View>

                <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeHeading}>8</Text>
                        <Text style={styles.badgeText}>Shifts Completed</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeHeading}>16</Text>
                        <Text style={styles.badgeText}>Missions Completed</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeHeading}>34</Text>
                        <Text style={styles.badgeText}>Pounds Rescued</Text>
                    </View>
                </View>

                <View style={{
                    boderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: '100%'
                }}>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-start',
        marginTop: 25,
        maxHeight: 200 // change this to be dynamic
    },
    profilePic: {
        width: 125,
        height: 125,
        borderRadius: 125 / 2
    },
    badgeContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        marginBottom: 25,
        alignItems: 'flex-start'
    },
    badge: {
        width: '33%'
    },
    badgeHeading: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20
    },
    badgeText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#9e9e9e'
    },
    title: {
        color: '#000000',
        marginTop: 10,
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
});