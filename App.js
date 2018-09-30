import React, {Component} from 'react'
import {Router, Stack, Scene} from 'react-native-router-flux'
import Home from './src/Screens/Home/Home'
import Details from './src/Screens/Details/Details'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="home" component={Home} title="The Startup Fest" />
          <Scene key="details" component={Details} title="Avalie a Startup" back />
        </Stack>
      </Router>
    )
  }
}
