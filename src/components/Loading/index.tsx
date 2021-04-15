import React from 'react';

import { Container, Animation } from './styles';

const Loading: React.FC = () => (
  <Container>
    <Animation
      source={require('assets/lottie/loading.json')}
      autoPlay
      loop
      hardwareAccelerationAndroid
      testID="LoadingAnimation"
    />
  </Container>
);

export default Loading;
