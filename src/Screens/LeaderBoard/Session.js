import React, {Component} from 'react'
import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native'
import { Divider, Icon } from 'react-native-elements'

import Position from './Position'
import StartupList from '../../StartupList'

import firebaseApp from '../../database/firebase'

var database = firebaseApp.database()

export default class Session extends Component {
    state = {
        isLoading: true,
        grades: [],
        startups: [],
        expanded: false,
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

    renderContent(){

        const { isLoading, grades, startups } = this.state

        return(
            isLoading ? 
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#512DA8" />
            </View> : 
            <View>
                <Position name={startups[0].name} segment={startups[0].segment} imgUrl={startups[0].imageUrl} position="1º" score={String(grades[0].toFixed(1))+"/5"} />
                <Position name={startups[1].name} segment={startups[1].segment} imgUrl={startups[1].imageUrl} position="2º" score={String(grades[1].toFixed(1))+"/5"} />
                <Position name={startups[2].name} segment={startups[2].segment} imgUrl={startups[2].imageUrl} position="3º" score={String(grades[2].toFixed(1))+"/5"} />
            </View>
        )
    }
    
    render(){
        const { session } = this.props
        const { container, textTitle, header } = styles
        const { expanded } = this.state
        
        return(
            <View style={container} >
                <View style={header}>
                    <TouchableOpacity onPress={() => { this.setState({ expanded: !expanded }) }}>
                        <View style={{width: '100%', flexDirection: 'row', padding: 16, justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={textTitle} >
                                {session}
                            </Text>
                            <View  style={{margin: 0}}><Icon name={expanded ? "expand-less" : "expand-more"} /></View>
                        </View>
                    </TouchableOpacity>
                </View>
                {expanded && <Divider style={{width: '100%', backgroundColor: '#BDBDBD'}} />}
                {expanded && this.renderContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'-32,
        marginHorizontal: 16,
        marginVertical: 8,
        alignItems: 'center',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
    },
    header: {
        width: '100%',
    },
    textTitle: {
        fontSize: 21,
        color: '#212121',
    },
})