import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import { Icon } from 'react-native-elements'

export default RatingView = ({ score }) => {

    let grade = score.split(".")[0]

    if(score.split(".")[1] && parseInt(score.split(".")[1])>5) grade = parseInt(grade)+1

    return(
        <View style={styles.container} >
            {(grade>0) ? <Icon name="star" size={20} /> : <Icon name="star-border" size={20} />}
            {(grade>1) ? <Icon name="star" size={20} /> : <Icon name="star-border" size={20} />}
            {(grade>2) ? <Icon name="star" size={20} /> : <Icon name="star-border" size={20} />}
            {(grade>3) ? <Icon name="star" size={20} /> : <Icon name="star-border" size={20} />}
            {(grade>4) ? <Icon name="star" size={20} /> : <Icon name="star-border" size={20} />}
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
