import React, {Component} from 'react'
import { ScrollView, View, ActivityIndicator, Text, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {Divider} from 'react-native-elements'

import Header from '../../Components/Header'
import Session from './Session'

import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

const client = new ApolloClient({
  uri: "https://startups-project-mytvsxrgeb.now.sh"
})

export default class LeaderBoard extends Component {
    state = {
        isLoading: true,
        startups: [],
        hasError: false,
    }
    
    componentWillMount(){
        client.query({
            query: gql`
              {
                allStartups {
                  name
                  imageUrl
                  Segment {
                    name
                  }
                }
              }
            `
        })
        .then(result => this.setState({
            isLoading: false,
            startups: result.data.allStartups,
        }))
        .catch(e => this.setState({
            isLoading: false,
            hasError: true,
        }))
    }

    render(){

        const { container, divider } = styles
        const { isLoading, hasError, startups } = this.state

        return(
            <View style={container} >
                <Header title="The Startup Fest" />
                {isLoading ? 
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#512DA8" /> 
                </View> :
                hasError ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image 
                        style={{width: 100, height: 100, margin: 16}}
                        source={require('../../img/cloud.png')}
                    />
                    <Text style={{ textAlign: 'center', maxWidth: 200 }}>
                        Que pena, parece que você está com problemas de conexão...
                    </Text>
                </View>
                : <ScrollView style={{flex: 1}} >
                    <Session startups={startups} session="Proposta" />
                    <Divider style={divider} />
                    <Session startups={startups} session="Apresentação/Pitch" />
                    <Divider style={divider} />
                    <Session startups={startups} session="Desenvolvimento" />
                </ScrollView>}
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        width: '100%',
        marginBottom: 56,
        backgroundColor: '#E8EAF6',
    },
    dividerStyle: {
        width: '100%',
        backgroundColor: '#bdbdbd'
    },
}
