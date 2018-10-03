import React, {Component} from 'react'
import {Router, Stack, Scene, Actions} from 'react-native-router-flux'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import Home from './src/Screens/Home/Home'
import Details from './src/Screens/Details/Details'
import LeaderBoard from './src/Screens/LeaderBoard/LeaderBoard'

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
      <Router>
        <Stack key="root">
          <Scene 
            key="home"
            component={Home}
            title="The Startup Fest"
            onRight={() => Actions.leaderboard()}
            renderRightButton={
              <TouchableOpacity style={{padding: 8, marginRight: 16}} onPress={() => Actions.leaderboard()}>
                <Icon name="trending-up" />
              </TouchableOpacity>
            }
          />
          <Scene key="details" component={Details} title="Avalie a Startup" back />
          <Scene key="leaderboard" component={LeaderBoard} title="Resultados" back />
        </Stack>
      </Router>
    )
  }
}
