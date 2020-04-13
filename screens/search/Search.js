// Place Holder for Search Feature
import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Text } from 'react-native';
import SuggestedEventsList from "../../components/search/SuggestedEventsList.js"

import Sizes from "../../constants/Sizes.js";

export default class Search extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SuggestedEventsList navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Sizes.width
    }
})
