import React, {Component} from 'react'
import {Router, Stack, Scene} from 'react-native-router-flux'
import Home from './src/Screens/Home'
import Details from './src/Screens/Details'

import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import gql from "graphql-tag"

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
})

export default class App extends Component {
  state = {
    msg: ''
  }

  componentDidMount(){
    client.query({
        query: gql`
          query {
            allRates {
              currency
            }
          }
        `
      })
      .then(result => this.setState({msg: 'Deu certo!!!'}))
      .catch(e => this.setState({msg: 'Deu ruim! '+String(e)}))
  }

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="home" component={Home} title="The Startup Fest" msg={this.state.msg} />
          <Scene key="details" component={Details} title="Avalie a Startup" back />
        </Stack>
      </Router>
    )
  }
}
