import React, {Component} from 'react'
import {StyleSheet, Text, ScrollView, View, TouchableOpacity, Image} from 'react-native'
import { Actions } from 'react-native-router-flux'

import Session from './Session'

export default class LeaderBoard extends Component {
    render(){
        
        const { container, imgContainer, textContainer, textTitle, textSeg, textDescript, ratingContainer } = styles
        
        return(
            <ScrollView style={{flex: 1, width: '100%'}} >
                <Session session="Proposta" />
                <Session session="Apresentação/Pitch" />
                <Session session="Desenvolvimento" />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    imgContainer: {
        width: 300,
        height: 300,
        backgroundColor: '#bbb',
        margin: 8,
    },
    ratingContainer: {
        alignItems: 'center',
        margin: 16,
    },
    textContainer: {
        alignItems: 'center',
        padding: 16,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    textSeg: {
        marginVertical: 8,
        fontSize: 20,
    },
    textDescript: {
        fontSize: 16,
        margin: 16,
        padding: 8,
        textAlign: 'center',
        fontStyle: 'italic',
        backgroundColor: '#fff',
    },
})
