import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();
import React, { memo } from 'react';
import {Container} from '../../globals/globalStyles/GlobalStyles';
import DisplayCategories from '../../components/Cards/DisplayCategories';
import {Categories} from '../../assets/data/Categories';
import {connect} from 'react-redux';
import { SafeAreaView } from 'react-native';

const Home = (props: any) => {
  return (
    <Container bgColor={props.theme.PRIMARY_BACKGROUND_COLOR}>
      <SafeAreaView style={{flex: 1}}>
        <DisplayCategories data={Categories} />
      </SafeAreaView>
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.AuthUser?.theme,
  };
};

export default connect(mapStateToProps, null)(memo(Home));