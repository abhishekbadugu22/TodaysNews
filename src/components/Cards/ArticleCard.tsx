import React, {memo} from 'react';
import styled from 'styled-components/native';
import normalize from 'react-native-normalize';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import {connect} from 'react-redux';
import { useState } from 'react';

type Data = {
  title: string;
  urlToImage: string;
  description: string;
};

interface Props {
  data: Data;
  theme: any;
}

const ArticleCard = (props: Props) => {
  const {data, theme} = props;
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <CardContainer 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={[styles.cardShadow,{width:isPressed? '90%':'93%'}]}
      color={theme.PRIMARY_BACKGROUND_COLOR}
      onPress={() => navigation.navigate('Details', {data: data})}>
      <Title numberOfLines={2} color={theme.PRIMARY_TEXT_COLOR}>
        {data?.title}
      </Title>
      <ImageContainer
        source={require('../../assets/images/defaultImage/defaultImage.jpg')}>
        <SharedElement id={`item.${data?.urlToImage}.image`}>
          <StyledImage
            source={
              data.urlToImage
                ? {uri: data?.urlToImage}
                : require('../../assets/images/defaultImage/defaultImage.jpg')
            }
            style={{height:isPressed?normalize(190): normalize(200)}}
            resizeMode={'cover'}
          />
        </SharedElement>
      </ImageContainer>
      <Description color={theme.SECONDARY_TEXT_COLOR} numberOfLines={2}>
        {data?.description}
      </Description>
    </CardContainer>
  );
};

const CardContainer = styled.TouchableOpacity<{color: string}>`
  width: 93%;
  align-self: center;
  margin: ${normalize(15)}px 0px ${normalize(4)}px 0px;
  border-radius: ${normalize(10)}px;
  background-color: ${({color}: any) => color};
`;

const StyledImage = styled.Image`
  width: 100%;
  height: ${normalize(200)}px;
`;

const Title = styled.Text<{color: string}>`
  font-size: ${normalize(22)}px;
  font-weight: bold;
  padding: ${normalize(5)}px ${normalize(10)}px 0px ${normalize(10)}px;
  color: ${({color}: any) => color};
`;

const ImageContainer = styled.ImageBackground`
  width: 100%;
  height: ${normalize(200)}px;
  margin: ${normalize(15)}px 0px ${normalize(15)}px 0px;
`;

const Description = styled.Text<{color: string}>`
  font-size: ${normalize(18)}px;
  color: gray;
  padding: 0px ${normalize(10)}px ${normalize(10)}px ${normalize(10)}px;
  color: ${({color}: any) => color};
`;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

const mapStateToProps = (state: any) => {
  return {
    theme: state.AuthUser?.theme,
  };
};

export default connect(mapStateToProps, null)(memo(ArticleCard));
