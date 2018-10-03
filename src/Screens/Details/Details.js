import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, ScrollView, Image} from 'react-native'
import { Actions } from 'react-native-router-flux'
import firebase from 'react-native-firebase'

import Button from '../../Components/Button'
import Rating from './Rating'

export default class Details extends Component {

    state = {
        isLoading: true,
        propostaGrade: 3,
        apresentGrade: 3,
        desenvolvGrade: 3,
        msg: 'Loading...',
    }

    proposta = (n) => {
        this.setState({ propostaGrade: n})
    }

    apresent = (n) => {
        this.setState({ apresentGrade: n})
    }

    desenvolv = (n) => {
        this.setState({ desenvolvGrade: n})
    }

    handleSendGrades = () => {
        // enviar as notas para o firebase && redirecionar para pagina inicial
        firebase.database().ref('startups/'+this.props.title.split(".").join("")).set(
            {
                rating: {
                    proposta: this.state.propostaGrade,
                    apresent: this.state.apresentGrade,
                    desenvolv: this.state.desenvolvGrade,
                },
                title: this.props.title.split(".").join(""),
            }
        ).then(() => {
            Actions.replace('home')
        }).catch((err) => {
            Actions.replace('home')
            console.log(err)
        })

        Actions.replace('home')
    }

    componentWillMount(){
        /* const { title, segment, description, imageUrl } = this.props

        firebase.database().ref('startups/AgroNow/title').on('value', (data) => {
            this.setState({ msg: data })
        })

        const { title } = this.props

        firebase.database().ref('startups/'+title).set(
            {
                title: title,
                rating: {
                    proposta: 0,
                    apresent: 0,
                    desenvolv: 0
                }
            }
        ).then(() => {
            this.setState({ isLoading: false })
        }).catch((err) => {
            console.log(err)
            this.setState({ isLoading: false })
        }) */
    }

    render() {

        const { title, segment, description, imageUrl } = this.props
        const { container, imgContainer, textContainer, textTitle, textSeg, textDescript, ratingContainer } = styles
        const { isLoading } = this.state

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
                    
                    {/* <Text>{this.state.msg}</Text> */}
                    
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
        color: '#000',
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
