import React, {Component} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import RatingView from './RatingView'

export default Position = ({ name, segment, imgUrl, position, score }) => {

    const { container, textContainer, starsContainer, textTitle, textGrade, textSegment } = styles

    return(
        <View style={container} >
            <Text style={textTitle} >{position}</Text>
            {(imgUrl!=='') && <Image 
                style={{width: 80, height: 80, margin: 16}}
                defaultSource={require('../../img/loading.png')}
                source={{uri: imgUrl}}
            />}
            <View style={textContainer} >
                <Text style={textTitle} >{name}</Text>
                <Text style={textSegment} >{segment}</Text>
                <View style={starsContainer} >
                    <RatingView score={score} />
                    <Text style={textGrade} >{score}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        padding: 8,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textContainer: {
        alignItems: 'flex-start',
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212121',
    },
    textGrade: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
    },
    textSegment: {
        fontSize: 16,
    },
})