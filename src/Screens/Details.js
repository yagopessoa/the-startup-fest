import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native'

export default class Details extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.nome}</Text>
            </View>
        )
    }
}