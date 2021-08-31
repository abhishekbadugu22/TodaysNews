import React, {memo} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';
import { connect } from 'react-redux';

const DisplayCategories = (props: any) => {
  const {data,theme} = props;
  const navigation = useNavigation();

  const headerComponent = () => {
    return (
      <>
        <StyledText size={30} color={theme.PRIMARY_TEXT_COLOR}>Welcome To</StyledText>
        <StyledText size={40} color={theme.PRIMARY_TEXT_COLOR}>Todays News!</StyledText>
      </>
    );
  };



  const renderItem = ({item}: any) => {

    const handleNavigation = () => {
      navigation.navigate('Lists', {data: item})
    }

    return (
      <CardContainer
        imageStyle={{borderRadius: 10}}
        source={item.image}
        resizeMode="cover">
        <TextContainer
          activeOpacity={0.8}
          color={theme.TRANSPARENT_COLOR}
          onPress={handleNavigation}>
          <Text>{item.name}</Text>
        </TextContainer>
      </CardContainer>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatGrid
        itemDimension={300}
        data={data}
        spacing={0}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={headerComponent}
      />
    </View>
  );
};

const CardContainer = styled.ImageBackground`
  height: ${normalize(230)}px;
  align-self: center;
  margin: ${normalize(10)}px ${normalize(8)}px ${normalize(10)}px
    ${normalize(8)}px;
  border-radius: ${normalize(10)}px;
  width: 95%;
`;

const TextContainer = styled.TouchableOpacity<{color:string}>`
  height: ${normalize(230)}px;
  background-color: ${({color}:any) => color};;
  border-radius: ${normalize(10)}px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Text = styled.Text`
  font-size: ${normalize(25)}px;
  color: white;
  font-weight: bold;
`;

const StyledText = styled.Text<{size: number,color: string}>`
  font-size: ${({size}: any) => normalize(size)}px;
  color: ${({color}:any) => color};
  margin-left: ${normalize(10)}px;
`;

const mapStateToProps = (state: any) => {
  return {
    theme: state.AuthUser?.theme,
  };
};


export default connect(mapStateToProps,null)(memo(DisplayCategories));
