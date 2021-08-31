import React, {useEffect, useState} from 'react';
import {View, Switch} from 'react-native';
import {CenteredContainer} from '../../globals/globalStyles/GlobalStyles';
import styled from 'styled-components/native';
import normalize from 'react-native-normalize';
import { connect } from 'react-redux';
import { changeToDarkTheme, changeToLightTheme } from '../../redux/authRedux/Action';
const Drawer = (props: any) => {
  const {theme,changeToDarkTheme,changeToLightTheme} = props;
  const toggleSwitchValue = () => {
    theme.mode == 'light' ? changeToDarkTheme() : changeToLightTheme()
  };

  return (
    <CenteredContainer bgColor={theme.PRIMARY_BACKGROUND_COLOR}>
      <Container>
        <Text color={theme.PRIMARY_TEXT_COLOR}>Dark Mode</Text>
        <Switch
          thumbColor={'white'}
          value={theme.mode === 'light' ? false : true}
          onValueChange={toggleSwitchValue}
          trackColor={{true:'gold'}}
        />
      </Container>
    </CenteredContainer>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Text = styled.Text<{color:string}>`
  font-size: ${normalize(18)}px;
  margin-right: ${normalize(10)}px;
  color: ${({color}:any) => color};
`;

const mapStateToProps = (state: any) => {
  return {
    theme: state.AuthUser?.theme,
  };
};

const mapDispatchToProps = (dispatch:any) => {
  return {
    changeToLightTheme : () => dispatch(changeToLightTheme()),
    changeToDarkTheme : () => dispatch(changeToDarkTheme())

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Drawer);
