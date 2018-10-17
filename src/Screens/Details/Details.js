import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, Image, Alert, TouchableOpacity} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Divider, Icon } from 'react-native-elements'

import Button from '../../Components/Button'
import Rating from './Rating'

import firebaseApp from '../../database/firebase'

var database = firebaseApp.database()

export default class Details extends Component {
    state = {
        isLoading: true,
        msg: 'Loading...',
        hasError: false,
        newProposta: 0, 
        newApresent: 0, 
        newDesenvolv: 0,
        disabled: false,
        helpProposta: false,
        helpApresent: false,
        helpDesenvolv: false,
    }

    proposta = (n) => {
        this.setState({ newProposta: n })
    }

    apresent = (n) => {
        this.setState({ newApresent: n })
    }

    desenvolv = (n) => {
        this.setState({ newDesenvolv: n })
    }

    handleSendGrades = () => {
        this.setState({ disabled: true })

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

                        Alert.alert(
                            'Parabéns!',
                            'Votos enviados com sucesso!',
                            [
                                {text: 'OK', onPress: () => {
                                    Actions.replace('home')
                                }},
                            ],
                            { cancelable: false }
                        )
                    }).catch(err => {
                        console.log('ERRO... ',err)
                        //this.setState({hasError: true, msg: String(err)})
                        Alert.alert(
                            'Ops!',
                            'Infelizmente seus votos não puderam ser enviados...',
                            [
                                {text: 'OK', onPress: () => {
                                    this.setState({ disabled: false })
                                }},
                            ],
                            { cancelable: false }
                        )
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
                        console.log("Dados salvos com sucesso!")
                        
                        Alert.alert(
                            'Parabéns!',
                            'Votos enviados com sucesso!',
                            [
                                {text: 'OK', onPress: () => {
                                    Actions.replace('home')
                                }},
                            ],
                            { cancelable: false }
                        )
                    }).catch(err => {
                        console.log('ERRO... ',err)
                        //this.setState({hasError: true, msg: String(err)})
                        Alert.alert(
                            'Ops!',
                            'Infelizmente seus votos não puderam ser enviados...',
                            [
                                {text: 'OK', onPress: () => {
                                    this.setState({ disabled: false })
                                }},
                            ],
                            { cancelable: false }
                        )
                    })
                }

            }, (err) => {
                this.setState({hasError: true, msg: String(err)})
            })
        } catch(e) { this.setState({hasError: true, msg: String(e)}) }
    }

    renderInfo(){

        const { annualReceipt, teamCount, description } = this.props

        return(
            <View style={styles.internalContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}} >
                <View  style={{paddingRight: 8}}><Icon style={{padding: 8}} name="people" color="#212121" size={20} /></View>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color:'#212121'}}>Membros no time: </Text>
                    <Text style={{fontSize: 18}}>{teamCount}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}} >
                <View  style={{paddingRight: 8}}><Icon style={{padding: 8}} name="attach-money" color="#212121" size={20} /></View>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color:'#212121'}}>Receita anual: </Text>
                    <Text style={{fontSize: 18}}>${annualReceipt}</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16}}>
                    <View  style={{paddingRight: 8}}><Icon name="info" color="#212121" size={20} /></View>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color:'#212121'}}>Quem somos:</Text>
                </View>
                <Text style={styles.textDescript}>"{description}"</Text>
            </View>
        )
    }

    render() {

        const { title, segment, imageUrl } = this.props
        const { container, scrollContainer, internalContainer, imgContainer, textContainer, textTitle, textSeg, textHelp, ratingContainer, dividerStyle, textLabel } = styles
        const { isLoading, newProposta, newApresent, newDesenvolv, disabled, helpApresent, helpProposta, helpDesenvolv } = this.state

        if(this.state.hasError) return <Text>{this.state.msg}</Text>

        return (
            <View style={container} >
                <ScrollView style={scrollContainer} >
                    <View style={internalContainer} >
                        <View style={imgContainer}>
                            <Image 
                                style={{width: 300, height: 300}}
                                defaultSource={require('../../img/loading.png')}
                                source={{uri: imageUrl}}
                            />
                        </View>
                        <Text style={textTitle}>{title}</Text>
                        <Text style={textSeg}>{segment}</Text>
                        
                        {this.renderInfo()}
                        
                        <View style={ratingContainer}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={textTitle}>
                                    Proposta
                                </Text>
                                <TouchableOpacity onPress={() => this.setState({ helpProposta: !helpProposta })}>
                                    <View style={{paddingLeft: 8}}><Icon name="help" color="#BDBDBD" /></View>
                                </TouchableOpacity>
                            </View>
                            {helpProposta && <Text style={textHelp}>
                                A ideia/proposta te agrada e causa um bom impacto?
                            </Text>}
                            <Rating action={this.proposta.bind(this)} />
                            {newProposta>0 && <Text style={textLabel}>{
                                newProposta===1 ? "Péssimo" :
                                newProposta===2 ? "Ruim" :
                                newProposta===3 ? "Regular" :
                                newProposta===4 ? "Bom" :
                                "Excelente"
                            }</Text>}
                        </View>

                        <Divider style={dividerStyle} />
                        <View style={ratingContainer}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={textTitle}>
                                    Apresentação
                                </Text>
                                <TouchableOpacity onPress={() => this.setState({ helpApresent: !helpApresent })}>
                                    <View style={{paddingLeft: 8}}><Icon name="help" color="#BDBDBD" /></View>
                                </TouchableOpacity>
                            </View>
                            {helpApresent && <Text style={textHelp}>
                                A startup soube demonstrar a sua proposta?
                            </Text>}
                            <Rating action={this.apresent.bind(this)} />
                            {newApresent>0 && <Text style={textLabel}>{
                                newApresent===1 ? "Péssimo" :
                                newApresent===2 ? "Ruim" :
                                newApresent===3 ? "Regular" :
                                newApresent===4 ? "Bom" :
                                "Excelente"
                            }</Text>}
                        </View>

                        <Divider style={dividerStyle} />
                        <View style={ratingContainer}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={textTitle}>
                                    Desenvolvimento
                                </Text>
                                <TouchableOpacity onPress={() => this.setState({ helpDesenvolv: !helpDesenvolv })}>
                                    <View style={{paddingLeft: 8}}><Icon name="help" color="#BDBDBD" /></View>
                                </TouchableOpacity>
                            </View>
                            {helpDesenvolv && <Text style={textHelp}>
                                No estagio atual do produto/serviço, atende bem a proposta?
                            </Text>}
                            <Rating action={this.desenvolv.bind(this)} />
                            {newDesenvolv>0 && <Text style={textLabel}>{
                                newDesenvolv===1 ? "Péssimo" :
                                newDesenvolv===2 ? "Ruim" :
                                newDesenvolv===3 ? "Regular" :
                                newDesenvolv===4 ? "Bom" :
                                "Excelente"
                            }</Text>}
                        </View>
                        
                        <View style={{width: '100%'}}>
                            <Button 
                                disabled={(newApresent<1)||(newDesenvolv<1)||(newProposta<1)||disabled}
                                onPress={this.handleSendGrades.bind(this)}
                                buttonTitle="ENVIAR AVALIAÇÃO"
                                iconTitle="send"
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 56,
        alignItems: 'center',
        backgroundColor: '#E8EAF6',
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    internalContainer: {
        flex: 1,
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
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'italic',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 16,
    },
    textHelp: {
        fontSize: 16,
        margin: 8,
        padding: 8,
        textAlign: 'center',
        fontStyle: 'italic',
        backgroundColor: '#fff',
    },
    dividerStyle: {
        width: '90%',
        backgroundColor: '#bdbdbd'
    },
    textLabel: {
        fontSize: 18,
        color: '#212121',
    }
})
