import React from 'react';

import { Container, Animation } from './styles';

const Error: React.FC = () => (
  <Container>
    <Animation
      source={require('assets/lottie/error.json')}
      autoPlay
      loop
      hardwareAccelerationAndroid
      testID="ErrorAnimation"
    />
  </Container>
);

export default Error;
