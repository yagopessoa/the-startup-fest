import React from 'react'
import { Icon } from 'react-native-elements'
import { Text, TouchableOpacity, View } from 'react-native'


const Button = ({ buttonTitle, iconTitle, onPress }) => {

    let hasIcon = false
    if(iconTitle) hasIcon = true

    const {textStyle, buttonStyle, buttonContainerStyle} = styles

    return (
        <View style={buttonContainerStyle}>
            <TouchableOpacity onPress={onPress} style={buttonStyle}>
                <View style={{flexDirection: 'row'}}>
                    {hasIcon && <View style={{marginRight: 16}}>
                        <Icon name={iconTitle} color='#fff'/>
                    </View>}
                    <Text style={textStyle}>{buttonTitle}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = {
    buttonContainerStyle:{
        height: 88,
        justifyContent: 'flex-end',
        alignItems:'stretch',
      },
    textStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonStyle: {
        height: 56,
        backgroundColor: '#673AB7',
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
    }
}

export default Button