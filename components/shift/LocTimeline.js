import React from "react";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Timeline from 'react-native-timeline-listview'

export default class ParticipantCard1 extends React.Component {
    constructor(props) {
        super(props)
        // this.data = [
        //     { title: 'Latin Beet (Meet here) ', description: '18 East 16th Street, New York, NY 10003 \n' },
        //     { title: 'Digg Inn', description: '364 Bleecker St., New York, NY 10002 \n', dotColor: '#fff' },
        //     { title: 'Bowery Mission', description: '227 Bower, New York, NY 10002 \n' }
        // ]
    }

    render() {
        return (
            <Timeline
                style={styles.list}
                data={this.props.markers}
                circleSize={15}
                circleColor='#79B830'
                innerCircle={'dot'}
                dotColor='#79B830'
                lineColor='#79B830'
                titleStyle={{
                    color: "#4A4A4A",
                    fontWeight: "600",
                    fontSize: 17,
                }}
                descriptionStyle={{
                    color: "#4A4A4A",
                    fontSize: 15,
                    selectable: true
                }}
                showTime={false}
                detailContainerStyle={{ marginTop: -12 }}
            />
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 65,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
});