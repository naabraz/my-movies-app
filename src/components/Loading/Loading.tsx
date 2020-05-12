import React from 'react';

import * as Styled from './Loading.style';

export const Loading: React.FC = () => (
  <Styled.Container>
    <Styled.Animation
      source={require('../../assets/lottie/loading.json')}
      autoPlay
      loop
      hardwareAccelerationAndroid
    />
  </Styled.Container>
);
