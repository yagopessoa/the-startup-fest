import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native'

import Button from '../../Components/Button'
import Rating from './Rating'

export default class Details extends Component {
    render() {

        const { title, segment, description } = this.props
        const { container, imgContainer, textContainer, textTitle, textSeg, textDescript, ratingContainer } = styles

        return (
            <ScrollView style={{flex: 1}} >
                <View style={container} >
                    <View style={imgContainer}></View>
                    <Text style={textTitle}>{title}</Text>
                    <Text style={textSeg}>{segment}</Text>
                    <Text style={textDescript}>{description}</Text>
                    
                    <View style={ratingContainer}>
                        <Text style={textTitle}>
                            Proposta
                        </Text>
                        <Rating />
                    </View>

                    <View style={ratingContainer}>
                        <Text style={textTitle}>
                            Apresentação/Pitch
                        </Text>
                        <Rating />
                    </View>

                    <View style={ratingContainer}>
                        <Text style={textTitle}>
                            Desenvolvimento
                        </Text>
                        <Rating />
                    </View>

                    <View style={{width: '100%'}}>
                        <Button buttonTitle="ENVIAR AVALIAÇÃO" iconTitle="send" />
                    </View>
                </View>
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
