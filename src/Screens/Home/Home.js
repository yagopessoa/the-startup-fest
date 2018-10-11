import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native'

import StartupCard from './StartupCard'
import StartupList from '../../StartupList'

import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

const client = new ApolloClient({
  uri: "https://startups-project-mytvsxrgeb.now.sh"
})

export default class Home extends Component {
    state = {
        msg: 'Loading...',
        itens: [],
        isLoading: true,
        hasError: false,
    }
    
    componentDidMount(){
        client.query({
            query: gql`
              {
                allStartups {
                  name
                  teamCount
                  description
                  imageUrl
                  annualReceipt
                  Segment {
                    name
                    code
                  }
                }
              }
            `
        })
        .then(result => this.setState({
            isLoading: false,
            itens: result.data.allStartups,
        }))
        .catch(e => this.setState({
            msg: String(e),
            isLoading: false,
            hasError: true,
            //itens: StartupList.data.allStartups,    // <== Using static data in case of no connection
        }))
    }

    renderList(){
        return this.state.itens.map(startup =>
            <StartupCard
                key={startup.name}
                info={startup}
            />
        )
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                {this.state.isLoading ? 
                    <View style={{flex: 1, alignItems: 'center', marginTop: 256}}>
                        <ActivityIndicator size="large" color="#512DA8" />
                    </View> : 
                    <View style={{flex: 1, alignItems: 'center'}}>
                        {this.state.hasError ? <Text style={{ marginTop: 256 }} >{this.state.msg}</Text> :
                            this.renderList()
                        }
                    </View>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
})
