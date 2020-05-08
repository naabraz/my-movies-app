import React from 'react';

import * as Styled from './Error.style';

export const Error: React.FC = () => (
  <Styled.Container>
    <Styled.Animation
      source={require('../../../assets/lottie/error.json')}
      autoPlay
      loop
      hardwareAccelerationAndroid
    />
  </Styled.Container>
);
