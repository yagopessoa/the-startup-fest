import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class StartupCard extends Component {
    state = {
        name: '',
        teamCount: 0,
        description: '',
        imageUrl: '',
        annualReceipt: 0,
        segment: {
            name: '',
            code: '',
        },
    }

    onPress = () => {
        
        const { name, description, segment, imageUrl } = this.state

        Actions.details({ 
            title: name,
            description: description,
            segment: segment.name,
            imageUrl: imageUrl,
        })
    }

    componentDidMount(){
        try{
            const { name, description, Segment, imageUrl } = this.props.info

            this.setState({
                name: name,
                description: description,
                segment: {
                    name: Segment.name
                },
                imageUrl: imageUrl,
            })
        } catch(e) { this.setState({ name: String(e) }) }
    }

    render(){
        const { name, segment, imageUrl } = this.state
        const { container, imgContainer, textContainer, textTitle, textSeg } = styles

        return(
            <View style={container}>
                <TouchableOpacity onPress={this.onPress} >
                    <View style={imgContainer}>
                        {(imageUrl!=='') && <Image 
                            style={{width: 250, height: 250}}
                            defaultSource={require('../../img/loading.png')}
                            source={{uri: imageUrl}}
                        />}
                    </View>
                    <View style={textContainer}>
                        <Text style={textTitle}>{name}</Text>
                        <Text style={textSeg}>{segment.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    container: {
        backgroundColor: '#fff',
        width: '100%' - 32,
        borderRadius: 5,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
    imgContainer: {
        width: 250,
        height: 250,
        backgroundColor: '#bbb',
        margin: 16,
    },
    textContainer: {
        alignItems: 'center',
        padding: 16,
    },
    textTitle: {
        marginBottom: 8,
        color: '#212121',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textSeg: {
        fontSize: 16,
    },
}