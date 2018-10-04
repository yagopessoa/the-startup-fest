import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import Position from './Position'
import StartupList from '../../StartupList'

export default class Session extends Component {
    state = {
        grades: [],
        startups: []
    }

    componentWillMount(){
        // getting random grades instead of reading from firebase
        var grades = []
        grades.push(Math.random()*4 + Math.random())
        grades.push(Math.random()*4 + Math.random())
        grades.push(Math.random()*4 + Math.random())
        grades.sort((a, b) => {return b-a})
        this.setState({grades: grades, startups: StartupList.data.allStartups})
    }
    
    render(){
        const { session } = this.props
        const { container, textTitle } = styles
        const { grades, startups } = this.state
        
        return(
            <View style={container} >
                <Text style={textTitle} >
                    {session}
                </Text>
                <Position name={startups[0].name} segment={startups[0].Segment.name} imgUrl={startups[0].imageUrl} position="1º" score={String(grades[0].toFixed(1))+"/5"} />
                <Position name={startups[1].name} segment={startups[1].Segment.name} imgUrl={startups[1].imageUrl} position="2º" score={String(grades[1].toFixed(1))+"/5"} />
                <Position name={startups[2].name} segment={startups[2].Segment.name} imgUrl={startups[2].imageUrl} position="3º" score={String(grades[2].toFixed(1))+"/5"} />
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
        color: '#212121',
        marginBottom: 8,
    },
})