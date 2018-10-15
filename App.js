import React, {Component} from 'react'
import {Router, Stack, Scene, Actions} from 'react-native-router-flux'
import { TouchableOpacity, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation-performance'

import Home from './src/Screens/Home/Home'
import Details from './src/Screens/Details/Details'
import LeaderBoard from './src/Screens/LeaderBoard/LeaderBoard'

export default class App extends Component {
  state = {
    sceneNumber: 0,
  }

  renderVoting(){
    return <Home />
  }

  renderResults(){
    return <LeaderBoard />
  }

  render() {
    const { sceneNumber } = this.state
    return (
        <View style={{flex: 1}} >
          {sceneNumber===0 ? this.renderVoting() : this.renderResults()}
          <BottomNavigation
            labelColor="#BDBDBD"
            rippleColor="#BDBDBD"
            activeLabelColor="#673AB7"
            style={{
              height: 56,
              elevation: 8, 
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.7,
              position: 'absolute', 
              left: 0, 
              bottom: 0, 
              right: 0 
            }}
            onTabChange={(newTabIndex) => {
              this.setState({ sceneNumber: newTabIndex })
            }}
          >
            <Tab
              label="Votação"
              icon={<Icon size={24} color="#BDBDBD" name="stars" />}
              activeIcon={<Icon size={24} color="#673AB7" name="stars" />}
            />
            <Tab
              label="Resultados"
              icon={<Icon size={24} color="#BDBDBD" name="timeline" />}
              activeIcon={<Icon size={24} color="#673AB7" name="timeline" />}
            />
          </BottomNavigation>
        </View>
    )
  }
}
