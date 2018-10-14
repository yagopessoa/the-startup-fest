import React from 'react'
import {Text, View} from 'react-native'

const Header = ({title}) => {
    const {text, container} = styles

    return(
        <View style={container} >
            <Text style={text} >{title}</Text>
        </View>
    )
}

const styles = {
    container: {
        backgroundColor: '#512DA8',
        justifyContent: 'flex-start', 
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    text: {
        fontSize: 20,
        color: '#fff',
        paddingLeft: 32,
    },
}

export default Header