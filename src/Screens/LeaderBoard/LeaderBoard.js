import React, {Component} from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {Divider} from 'react-native-elements'

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
            msg: String(e),
            isLoading: false,
            hasError: true,
            // TODO: show no connection icon
        }))
    }

    render(){

        const { isLoading, startups } = this.state

        return(
            <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                {isLoading ? <ActivityIndicator size="large" color="#512DA8" /> :
                <ScrollView style={{flex: 1}} >
                    <Session startups={startups} session="Proposta" />
                    <Divider style={this.dividerStyle} />
                    <Session startups={startups} session="Apresentação/Pitch" />
                    <Divider style={this.dividerStyle} />
                    <Session startups={startups} session="Desenvolvimento" />
                </ScrollView>}
            </View>
        )
    }

    dividerStyle = {width: '100%', backgroundColor: '#bdbdbd'}
}
