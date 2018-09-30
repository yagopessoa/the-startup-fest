import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

export default class Rating extends Component {

    state = {
        grade: 3
    }
    
    renderStar(){
        return(
            <View style={styles.starContainer}>
                <Icon name="star" size={40} />
            </View>
        )
    }

    renderStarBorder(){
        return(
            <View style={styles.starContainer}>
                <Icon name="star-border" size={40} />
            </View>
        )
    }

    renderStarHalf(){
        return(
            <View style={styles.starContainer}>
                <Icon name="star-half" size={40} />
            </View>
        )
    }

    componentDidMount() {
        try {
            if(this.props.grade) this.setState({ grade: this.props.grade })
        } catch(e) { console.log(e) }
    }
    
    render(){
        
        const { container, starContainer } = styles
        const { grade } = this.state

        return(
            <View style={container} >
                {this.renderStar()}                
                { (grade >= 2) ?
                    this.renderStar() :
                    this.renderStarBorder() }
                { (grade >= 3) ?
                    this.renderStar() :
                    this.renderStarBorder() }
                { (grade >= 4) ?
                    this.renderStar() :
                    this.renderStarBorder() }
                { (grade >= 5) ?
                    this.renderStar() :
                    this.renderStarBorder() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        paddingTop: 8,
        alignItems: 'center',
    },
    starContainer: {
        marginHorizontal: 4,
    }
})