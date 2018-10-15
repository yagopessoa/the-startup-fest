import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Divider } from 'react-native-elements'

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
        const title = name
        const segmen = segment.name

        //this.props.openDetails(title, description, segmen, imageUrl)

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
                    <View style={{flexDirection: 'row', alignContent: 'flex-start', width: '100%'}}>
                        {(imageUrl!=='') && <Image 
                            style={{width: 100, height: 100, margin: 16}}
                            defaultSource={require('../../img/loading.png')}
                            source={{uri: imageUrl}}
                        />}
                        <View style={textContainer}>
                            <Text style={textTitle}>{name}</Text>
                            <Text style={textSeg}>{segment.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider style={{width: '100%', backgroundColor: '#BDBDBD'}} />
            </View>
        )
    }
}

const styles = {
    container: {
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
    },
    imgContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#bbb',
        margin: 16,
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
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