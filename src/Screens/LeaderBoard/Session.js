import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'

import Position from './Position'

export default class Session extends Component {
    
    render(){
        const { session } = this.props
        const { container, textTitle } = styles

        const name = "Startup"
        const segment = "Top"
        const imgUrl = "https://thumb.lovemondays.com.br/image/40fa4baba2854c2fa7399bbb90debcc1/logos/4a835e/techfit.png"
        
        return(
            <View style={container} >
                <Text style={textTitle} >
                    {session}
                </Text>
                <Position name={name} segment={segment} imgUrl={imgUrl} position="1º" score="4,8/5" />
                <Position name={name} segment={segment} imgUrl={imgUrl} position="2º" score="4,2/5" />
                <Position name={name} segment={segment} imgUrl={imgUrl} position="3º" score="3,5/5" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
})