import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-self: center;
`;

const Animation = styled(LottieView)`
  width: 200px;
`;

export { Container, Animation };
