import {useRoute} from '@react-navigation/native';
import React, {memo, useEffect, useState} from 'react';
import ArticleCard from '../../components/Cards/ArticleCard';
import LoaderComponent from '../../components/Loader/LoaderComponent';
import {axiosInstance} from '../../assets/config/baseUrl/BaseUrl';
import {Container} from '../../globals/globalStyles/GlobalStyles';
import {FlatGrid} from 'react-native-super-grid';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native';
import { useCallback } from 'react';

const Lists = (props: any) => {
  const route = useRoute();
  const {data}: any = route.params;
  const ColorMode = props.theme?.mode == 'dark' ? 'white' : 'black'
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(
        `top-headlines?country=in&category=${data?.category}&apiKey=d784c0cee04d481a9ebb82e17d3f8ddd`,
      )
      .then(response => setNewsList(response?.data?.articles))
      .catch(error => console.log('Lists Error', error?.message))
      .finally(() => setIsLoading(false));
  }, []);

  const renderItem = useCallback(({item}: any) => {
    return <ArticleCard data={item} theme={props.theme} />;
  },[newsList]);

  if (isLoading) {
    return (
      <LoaderComponent
        theme={props.theme}
        color={ColorMode}
        size={30}
      />
    );
  }

  const keyExtractor = (item:any) => item.title

  return (
    <Container bgColor={props.theme.PRIMARY_BACKGROUND_COLOR}>
      <SafeAreaView style={{flex: 1}}>
        <FlatGrid
          itemDimension={300}
          spacing={0}
          data={newsList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.AuthUser?.theme,
  };
};

export default connect(mapStateToProps, null)(memo(Lists));
