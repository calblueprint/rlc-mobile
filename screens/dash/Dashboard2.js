import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { AuthSession } from 'expo';

import EventsList from '../../components/dashboard/EventsList2.js';
import Activity from '../../components/dashboard/ActivityCard';

export default class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>

            <View style={styles.currentEvent}>
                <View style={{ height: '80%', marginTop: 20}}> 
                    <ScrollView 
                        style={styles.horizontalView}
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        >
                        
                        <Activity 
                            location={"📍 Union Square"}
                            name={"Union Square (US014)"}
                            time={"8:15 to 9:15 PM"}
                            weight={"10 to 45 lbs"}
                            numpickups={"2"}
                            spotsOpen={"1 of 2"}
                        />
                    </ScrollView>
                </View>
            </View>    

            <EventsList />

            </View>
        );
    }
}

Dashboard.navigationOptions = {
    title: 'Home',
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    currentEvent: {
        backgroundColor: '#EEEEEE',
        height: '35%',
    },
    subText: {
        color: '#000000',
        fontStyle: 'italic',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'normal',
        marginTop: '27.5%',
        opacity: 0.85,
        fontSize: 16
    }, 
    eventsList: {
        flex: 1,
        height: '100%',
    }, 
    horizontalView: {
        height: "100%",
        backgroundColor: 'pink',
        marginHorizontal: 20,
        marginVertical: 20
    }
});