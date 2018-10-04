import React, {Component} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import RatingView from './RatingView'

export default Position = ({ name, segment, imgUrl, position, score }) => {

    const { container, textContainer, starsContainer, textTitle, textGrade, textSegment } = styles

    return(
        <View style={container} >
            <Text style={textTitle} >{position}</Text>
            {(imgUrl!=='') && <Image 
                style={{width: 100, height: 100, margin: 8}}
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
        borderRadius: 5,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
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