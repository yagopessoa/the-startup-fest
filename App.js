import React, {Component} from 'react'
import {Router, Stack, Scene, Actions} from 'react-native-router-flux'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import Home from './src/Screens/Home/Home'
import Details from './src/Screens/Details/Details'
import LeaderBoard from './src/Screens/LeaderBoard/LeaderBoard'

export default class App extends Component {

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene 
            key="home"
            component={Home}
            navigationBarStyle={{backgroundColor: '#673AB7'}}
            navBarButtonColor="#fff"
            title="The Startup Fest"
            onRight={() => Actions.leaderboard()}
            renderRightButton={
              <TouchableOpacity style={{padding: 8, marginRight: 16}} onPress={() => Actions.leaderboard()}>
                <Icon name="trending-up" color="#fff" />
              </TouchableOpacity>
            }
          />
          <Scene 
            key="details"
            component={Details}
            navigationBarStyle={{backgroundColor: '#673AB7'}}
            navBarButtonColor="#fff"
            title="Avalie a Startup"
            back
          />
          <Scene 
            key="leaderboard"
            component={LeaderBoard}
            navigationBarStyle={{backgroundColor: '#673AB7'}}
            navBarButtonColor="#fff"
            title="Resultados"
            back
          />
        </Stack>
      </Router>
    )
  }
}
