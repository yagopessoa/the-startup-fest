import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, Image} from 'react-native'
import {Router, Stack, Scene} from 'react-native-router-flux'

import Header from '../../Components/Header'
import StartupCard from './StartupCard'
import Details from '../Details/Details'

import ApolloClient from "apollo-boost"
import gql from "graphql-tag"

const client = new ApolloClient({
  uri: "https://startups-project-mytvsxrgeb.now.sh"
})

class Voting extends Component {
    state = {
        msg: 'Loading...',
        itens: [],
        isLoading: true,
        hasError: false,
        details: false,
        info: null,
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
                <View style={{flex: 1, padding: 16}} > 
                    {this.state.isLoading ? 
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size="large" color="#512DA8" />
                        </View> :
                        this.state.hasError ? 
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                {/* <Text>{this.state.msg}</Text> */}
                                <Image 
                                    style={{width: 100, height: 100, margin: 16}}
                                    source={require('../../img/cloud.png')}
                                />
                                <Text style={{ textAlign: 'center', maxWidth: 200 }}>
                                    Que pena, parece que você está com problemas de conexão...
                                </Text>
                            </View>
                            :
                            <View style={{flex: 1}} >
                                <Text style={{textAlign: 'center', paddingBottom: 16}}>Escolha uma Startup para votar:</Text>
                                <ScrollView style={styles.scrollContainer} >
                                    {this.renderList()}
                                </ScrollView>
                            </View>
                    }
                </View>
            </View>
        )
    }
}

export default class Home extends Component {
    render(){
        return(
            <Router>
                <Stack key="root">
                    <Scene key="home" component={Voting} hideNavBar />
                    <Scene 
                        key="details"
                        component={Details} 
                        navigationBarStyle={{backgroundColor: '#673AB7'}}
                        navBarButtonColor="#fff"
                        back
                    />
                </Stack>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 56,
        backgroundColor: '#E8EAF6',
    },
    scrollContainer: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
    },
})
