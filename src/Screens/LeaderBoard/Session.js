import React, {Component} from 'react'
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native'

import Position from './Position'
import StartupList from '../../StartupList'

import firebaseApp from '../../database/firebase'

var database = firebaseApp.database()

export default class Session extends Component {
    state = {
        isLoading: true,
        grades: [],
        startups: []
    }

    componentWillMount(){
        var { startups, session } = this.props

        database.ref('startups').on('value', (snapshot) => {

            this.setState({ isLoading: true })

            var votedStartups = snapshot.val()
            var itens = []

            for(var i=0; i<startups.length; i++){
                try{
                    const name = startups[i].name.split(".").join("")
                    itens.push({
                        name: startups[i].name,
                        segment: startups[i].Segment.name,
                        imageUrl: startups[i].imageUrl,
                        apresent: votedStartups[name].rating.apresent,
                        proposta: votedStartups[name].rating.proposta,
                        desenvolv: votedStartups[name].rating.desenvolv,
                    })
                } catch (e) { console.log(e) }
            }

            var grades = []

            switch(session){
                case 'Proposta':
                    itens.sort((a, b) => {return b.proposta-a.proposta})
                    grades.push(itens[0].proposta)
                    grades.push(itens[1].proposta)
                    grades.push(itens[2].proposta)
                    break
                case 'Apresentação/Pitch':
                    itens.sort((a, b) => {return b.apresent-a.apresent})
                    grades.push(itens[0].apresent)
                    grades.push(itens[1].apresent)
                    grades.push(itens[2].apresent)
                    break
                case 'Desenvolvimento':
                    itens.sort((a, b) => {return b.desenvolv-a.desenvolv})
                    grades.push(itens[0].desenvolv)
                    grades.push(itens[1].desenvolv)
                    grades.push(itens[2].desenvolv)
                    break
            }

            this.setState({ startups: itens, grades: grades, isLoading: false })
        }, (err) => {
            this.setState({ isLoading: false })
        })
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
                {this.state.isLoading ? 
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#512DA8" />
                </View> : 
                <View>
                    <Position name={startups[0].name} segment={startups[0].segment} imgUrl={startups[0].imageUrl} position="1º" score={String(grades[0].toFixed(1))+"/5"} />
                    <Position name={startups[1].name} segment={startups[1].segment} imgUrl={startups[1].imageUrl} position="2º" score={String(grades[1].toFixed(1))+"/5"} />
                    <Position name={startups[2].name} segment={startups[2].segment} imgUrl={startups[2].imageUrl} position="3º" score={String(grades[2].toFixed(1))+"/5"} />
                </View>}
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