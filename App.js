import React, {Component} from 'react'
import {View} from 'react-native'
import {Router, Stack, Scene} from 'react-native-router-flux'
import Home from './src/Screens/Home'
import Details from './src/Screens/Details'

import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import gql from "graphql-tag"

const client = new ApolloClient({
  uri: "https://startups-project-mytvsxrgeb.now.sh"
})

export default class App extends Component {
  state = {
    msg: '',
    startups: null,
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
        msg: 'Deu certo!!!',
        isLoading: false,
        startups: result.data.allStartups[1].name,
      }))
      .catch(e => this.setState({
        msg: 'Deu ruim! '+String(e),
        isLoading: false,
      }))
  }

  render() {
    return (
      <View style={{flex: 1}} >
        {this.state.isLoading ? <Text>Is loading...</Text> :
        <Router>
          <Stack key="root">
            <Scene key="home" component={Home} title="The Startup Fest" msg={this.state.msg+' => '+this.state.startups} />
            <Scene key="details" component={Details} title="Avalie a Startup" back />
          </Stack>
        </Router>}
      </View>
    )
  }
}
