import React, {Component} from 'react'
import { ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Session from './Session'

export default class LeaderBoard extends Component {
    render(){
        
        return(
            <ScrollView style={{flex: 1, width: '100%'}} >
                <Session session="Proposta" />
                <Session session="Apresentação/Pitch" />
                <Session session="Desenvolvimento" />
            </ScrollView>
        )
    }
}
