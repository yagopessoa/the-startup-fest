import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'

import Button from '../../Components/Button'
import StartupCard from './StartupCard'

import StartupList from '../../StartupList'

export default class Home extends Component {
    state = {
        itens: null,
    }

    renderList(){
        return this.state.itens.map(startup =>
            <StartupCard
                key={startup.name}
                info={startup}
            />
        )
    }

    componentWillMount(){
        this.setState({
            itens: StartupList.data.allStartups
        })
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                {this.renderList()}
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
