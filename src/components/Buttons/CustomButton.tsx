import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

interface Props {
    title: string,
    color: string,
    theme: any,
    action:any
}

const CustomButton = (props:Props) => {
    return (
        <Button activeOpacity={0.5} onPress={props.action}>
            <Text>{props.title}</Text>
        </Button>
    )
}

const Button = styled.TouchableOpacity`

`

export default CustomButton
