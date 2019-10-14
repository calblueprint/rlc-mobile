import React, { Component } from 'react';
import { StyleSheet, View, Icon, TextInput, TouchableOpacity, Text, Switch, Image } from 'react-native';

export default class ProfileHeader extends Component {
    render() {
        return (
            <View style={styles.profileContainer}>
                <Image 
                style={styles.profilePic}
                source={require('../../assets/images/rlcprofilepic.png')} />

                <Text style={styles.title}>Melody Wei</Text>
                <Text style={styles.subtext}>Member since September 2019</Text>

                <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeHeading}>8</Text>
                        <Text style={styles.badgeText}>Shifts Completed</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeHeading}>16</Text>
                        <Text style={styles.badgeText}>Miles Completed</Text>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeHeading}>34</Text>
                        <Text style={styles.badgeText}>Pounds Rescued</Text>
                    </View>
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
        borderRadius: 125/2
    }, 
    badgeContainer: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' 
    },
    badge: {
        width: '33%'
    },
    badgeHeading: {
        fontWeight: '600',
        fontSize: 20
    },
    badgeText: {
        fontSize: 12,
        opacity: 0.9
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