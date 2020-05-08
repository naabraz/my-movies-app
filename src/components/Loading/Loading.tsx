import React from 'react';
import LottieView from 'lottie-react-native';

export const Loading: React.FC = () => (
  <LottieView
    source={require('../../../assets/lottie/loading.json')}
    autoPlay
    loop
    hardwareAccelerationAndroid
  />
);
