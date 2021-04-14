import React from 'react';

import * as Styled from './styles';

const Loading: React.FC = () => (
  <Styled.Container>
    <Styled.Animation
      source={require('assets/lottie/loading.json')}
      autoPlay
      loop
      hardwareAccelerationAndroid
      testID="LoadingAnimation"
    />
  </Styled.Container>
);

export default Loading;
