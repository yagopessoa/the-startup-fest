import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import { Actions } from 'react-native-router-flux'

import Button from '../../Components/Button'
import Rating from './Rating'

import firebaseApp from '../../database/firebase'

var database = firebaseApp.database()

export default class Details extends Component {
    state = {
        isLoading: true,
        msg: 'Loading...',
        hasError: false,
        newProposta: 3, 
        newApresent: 3, 
        newDesenvolv: 3,
    }

    proposta = (n) => {
        this.setState({ newProposta: n})
    }

    apresent = (n) => {
        this.setState({ newApresent: n})
    }

    desenvolv = (n) => {
        this.setState({ newDesenvolv: n})
    }

    handleSendGrades = () => {
        const { newProposta, newApresent, newDesenvolv } = this.state
        const startupName = this.props.title.split(".").join("")

        try{
            database.ref('startups/'+startupName).once('value', (snapshot) => {

                if(snapshot.val()===null){

                    database.ref('startups/'+startupName).set({
                        rating: {
                            proposta: newProposta,
                            apresent: newApresent,
                            desenvolv: newDesenvolv,
                        },
                        qtd: 1,
                    }).then(() => {
                        console.log("Dados salvos com sucesso!")
                        Actions.replace('home')
                    }).catch(err => {
                        console.log('ERRO... ',err)
                        this.setState({hasError: true, msg: String(err)})
                    })

                } else {

                    const proposta = snapshot.val().rating.proposta
                    const apresent = snapshot.val().rating.apresent
                    const desenvolv = snapshot.val().rating.desenvolv
                    const qtd = snapshot.val().qtd + 1

                    database.ref('startups/'+startupName).set({
                        rating: {
                            proposta: ((proposta*(qtd-1))+newProposta)/qtd,
                            apresent: ((apresent*(qtd-1))+newApresent)/qtd,
                            desenvolv: ((desenvolv*(qtd-1))+newDesenvolv)/qtd,
                        },
                        qtd: qtd,
                    }).then(() => {
                        Actions.replace('home')
                        console.log("Dados salvos com sucesso!")
                    }).catch(err => {
                        console.log('ERRO... ',err)
                        this.setState({hasError: true, msg: String(err)})
                    })
                }

            }, (err) => {
                this.setState({hasError: true, msg: String(err)})
            })
        } catch(e) { this.setState({hasError: true, msg: String(e)}) }
    }

    render() {

        const { title, segment, description, imageUrl } = this.props
        const { container, imgContainer, textContainer, textTitle, textSeg, textDescript, ratingContainer } = styles
        const { isLoading } = this.state

        if(this.state.hasError) return <Text>{this.state.msg}</Text>

        return (
            <ScrollView style={{flex: 1}} >
                <View style={container} >
                    <View style={imgContainer}>
                        <Image 
                            style={{width: 300, height: 300}}
                            defaultSource={require('../../img/loading.png')}
                            source={{uri: imageUrl}}
                        />
                    </View>
                    <Text style={textTitle}>{title}</Text>
                    
                    <Text style={textSeg}>{segment}</Text>
                    <Text style={textDescript}>{description}</Text>
                    
                    <View style={ratingContainer}>
                        <Text style={textTitle}>
                            Proposta
                        </Text>
                        <Rating action={this.proposta.bind(this)} />
                        
                    </View>

                    <View style={ratingContainer}>
                        <Text style={textTitle}>
                            Apresentação/Pitch
                        </Text>
                        <Rating action={this.apresent.bind(this)} />
                    </View>

                    <View style={ratingContainer}>
                        <Text style={textTitle}>
                            Desenvolvimento
                        </Text>
                        <Rating action={this.desenvolv.bind(this)} />
                    </View>

                    <View style={{width: '100%'}}>
                        <Button onPress={this.handleSendGrades.bind(this)} buttonTitle="ENVIAR AVALIAÇÃO" iconTitle="send" />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    imgContainer: {
        width: 300,
        height: 300,
        backgroundColor: '#bbb',
        margin: 8,
    },
    ratingContainer: {
        alignItems: 'center',
        margin: 16,
    },
    textContainer: {
        alignItems: 'center',
        padding: 16,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212121',
    },
    textSeg: {
        marginVertical: 8,
        fontSize: 20,
    },
    textDescript: {
        fontSize: 16,
        margin: 16,
        padding: 8,
        textAlign: 'center',
        fontStyle: 'italic',
        backgroundColor: '#fff',
    },
})
