// Place Holder for Search Feature
import React, { Component } from '../../node_modules/react';
import { StyleSheet, View, Text} from 'react-native';

import Sizes from "../../constants/Sizes.js";

export default class Search extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>You like what you see?</Text>
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
