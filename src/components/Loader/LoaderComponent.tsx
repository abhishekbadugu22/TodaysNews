import React from 'react';
import {ActivityIndicator} from 'react-native';
import normalize from 'react-native-normalize';
import {Loader} from '../../globals/globalStyles/GlobalStyles';

interface Props {
  color: string;
  size: number;
  theme:any;
}

const LoaderComponent = (props: Props) => {
  const {color, size,theme} = props;

  return (
    <Loader theme={theme}>
      <ActivityIndicator size={normalize(size)} color={color} />
    </Loader>
  );
};

export default LoaderComponent;
