import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native'
import Button from '../Components/Button'
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
    
    handleOpenStartup = () => {
        Actions.details({ nome: 'YAY' })
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Hello World!</Text>
                <Button onPress={this.handleOpenStartup.bind(this)} buttonTitle={'CLICK ME'} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  })
