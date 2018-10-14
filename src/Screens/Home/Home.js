import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native'

import Header from '../../Components/Header'
import StartupCard from './StartupCard'

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
            // TODO: show no connection icon
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
            <View style={styles.container}>
                <Header title="The Startup Fest" />
                <View style={{flex: 1}} > 
                    {this.state.isLoading ? 
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size="large" color="#512DA8" />
                        </View> :
                        <ScrollView style={{flex: 1, paddingHorizontal: 16}} >
                            {this.state.hasError ? <Text style={{ marginTop: 256 }} >{this.state.msg}</Text> :
                                this.renderList()
                            }
                        </ScrollView>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 56,
        backgroundColor: '#F0F0F0',
    },
})
