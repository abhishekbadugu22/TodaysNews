import styled from 'styled-components/native';
import normalize from 'react-native-normalize';

export const Container = styled.View<{bgColor:string}>`
    flex: 1;
    background-color: ${({bgColor = 'white'}) => bgColor};
`

export const CenteredContainer = styled(Container)`
    justify-content: center;
    align-items: center;
`

export const StyledText = styled.Text<{size:number,color:string}>`
    font-size: ${({size}) => normalize(size)}px;
    color: ${({color = 'black'}) => color};
`

export const Loader = styled.View<{theme:any}>`
    flex: 1;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: ${({theme}) => theme.PRIMARY_BACKGROUND_COLOR};
`