import {useNavigation, useRoute} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Container} from '../../globals/globalStyles/GlobalStyles';
import styled from 'styled-components/native';
import normalize from 'react-native-normalize';
import {ScrollView} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {OpenLink} from '../../globals/globalStyles/OpenBrowser';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import CustomButton from '../../components/Buttons/CustomButton';

type Data = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: any;
  title: string;
  url: string;
  urlToImage: string;
};

interface RoutData {
  data: Data;
}

const Details = (props:any) => {
  const route = useRoute();
  const {data} = route.params as RoutData;
  const {theme} = props;
  const handleNavigation = () => {
    OpenLink(`${data?.url}`);
  };
  const navigation = useNavigation();
  const handleGoToSettings = () => {
    navigation.navigate('Settings')
  }

  return (
    <Container bgColor={theme.PRIMARY_BACKGROUND_COLOR}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <HeadLine color={theme.PRIMARY_TEXT_COLOR}>{data?.title}</HeadLine>
          <ImageContainer
            source={require('../../assets/images/defaultImage/defaultImage.jpg')}>
            <SharedElement id={`item.${data?.urlToImage}.image`}>
              <Image source={{uri: data?.urlToImage}} resizeMode={'stretch'} />
            </SharedElement>
          </ImageContainer>
          <Description color={theme.SECONDARY_TEXT_COLOR}>{data?.description}</Description>
          <Description color={theme.SECONDARY_TEXT_COLOR}>
            By {data?.source?.name} | Edited by {data?.author}
          </Description>
          <Description color={theme.SECONDARY_TEXT_COLOR}>{data?.publishedAt}</Description>
          <Content color={theme.PRIMARY_TEXT_COLOR}>
            {data?.content?.substr(0, data?.content?.length - 15)}
          </Content>
          <SiteLink fontWeight={'bold'} color={theme.PRIMARY_TEXT_COLOR}>
            Read More :{' '}
            <SiteLink onPress={handleNavigation} color={'dodgerblue'}>
              {data?.url}
            </SiteLink>
          </SiteLink>
          <CustomButton  title={'Go to Settings'} action={handleGoToSettings} color={'red'} theme={theme} />
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

const HeadLine = styled.Text<{color:string}>`
  font-size: ${normalize(25)}px;
  font-weight: bold;
  padding-left: ${normalize(7)}px;
  padding-right: ${normalize(7)}px;
  color: ${({color}:any) => color};
`;

const ImageContainer = styled.ImageBackground`
  width: 100%;
  height: ${normalize(200)}px;
  margin-top: ${normalize(10)}px;
`;

const Image = styled.Image`
  width: 100%;
  height: ${normalize(200)}px;
`;

const Description = styled.Text<{color:string}>`
  font-size: ${normalize(15)}px;
  padding-left: ${normalize(7)}px;
  padding-right: ${normalize(7)}px;
  margin-top: ${normalize(10)}px;
  color: ${({color}:any) => color};
`;

const Content = styled.Text<{color:string}>`
  font-size: ${normalize(19)}px;
  padding-left: ${normalize(7)}px;
  padding-right: ${normalize(7)}px;
  margin-top: ${normalize(10)}px;
  font-weight: 600;
  color: ${({color}:any) => color};
`;
const SiteLink = styled.Text<{color:string,fontWeight?:any}>`
  font-size: ${normalize(18)}px;
  padding-left: ${normalize(7)}px;
  padding-right: ${normalize(7)}px;
  margin-top: ${normalize(10)}px;
  color: ${({color = 'black'}) => color};
  font-weight: ${({fontWeight = 500}) => fontWeight};
`;

Details.sharedElements = (route: any) => {
  const {data} = route.params;
  return [{
    id:`item.${data.urlToImage}.image`,
    animation: 'fade',
    resize: 'clip',
  }];
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.AuthUser?.theme,
  };
};

export default connect(mapStateToProps)(Details);
