import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import { Icon } from 'react-native-elements'

export default RatingView = ({ score }) => {

    let grade = score.split(".")[0]

    if(score.split(".")[1] && parseInt(score.split(".")[1])>5) grade = parseInt(grade)+1

    return(
        <View style={styles.container} >
            <Icon name={(grade>0) ? "star" : "star-border"} color="#FBC02D" size={20} />
            <Icon name={(grade>1) ? "star" : "star-border"} color="#FBC02D" size={20} />
            <Icon name={(grade>2) ? "star" : "star-border"} color="#FBC02D" size={20} />
            <Icon name={(grade>3) ? "star" : "star-border"} color="#FBC02D" size={20} />
            <Icon name={(grade>4) ? "star" : "star-border"} color="#FBC02D" size={20} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 4,
        marginRight: 4,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})
