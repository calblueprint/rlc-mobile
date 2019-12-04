import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { AuthSession } from 'expo';

import EventsList from '../../components/dashboard/EventsList2.js';
import ActivityCard from '../../components/dashboard/ActivityCard';

export default class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>

            <View style={styles.currentEvent}>
                
                    <ScrollView 
                        style={styles.horizontalView}
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        snapToAlignment={"center"}
                        >

                        <View style={styles.slideStructure}>
                            <Text style={styles.inProgress}>• In Progress</Text>
                            <ActivityCard 
                                location={"📍 Washington Square Park"}
                                name={"Washington Arch (TA114)"}
                                time={"1:00 to 2:30 PM"}
                                weight={"25 to 45 lbs"}
                                numpickups={"3"}
                                spotsOpen={"1 of 3"}
                            />
                        </View>

                        <View style={styles.slideStructure}>
                            <Text style={styles.needsAttention}>• Needs Attention</Text>
                            <ActivityCard 
                                location={"📍 Korea Town NYC"}
                                name={"Kimbachi Tan (SA457)"}
                                time={"5:00 to 6:30 PM"}
                                weight={"25 to 45 lbs"}
                                numpickups={"3"}
                                spotsOpen={"1 of 3"}
                            />
                        </View>
                        
                    </ScrollView>
                
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
        height: '30%',
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
        marginVertical: 10
    },
    scrollWrapper: {
        height: '90%', 
    },
    slideStructure: {
        width: 400, 
        height: 400
    },
    inProgress: {
        color: "#7CB342",
        fontStyle: 'italic',
        fontWeight: "700",
        textAlign: "center",
        opacity: 0.9,
        fontSize: 16,
        marginBottom: 10
    }, 
    needsAttention: {
        color: "#E64A19",
        fontStyle: 'italic',
        fontWeight: "700",
        textAlign: "center",
        opacity: 0.9,
        fontSize: 16,
        marginBottom: 10
    }
});