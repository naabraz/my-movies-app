import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { theme } from '@gympass/yoga';

const { spacing } = theme;

export const TabItem = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  margin-bottom: ${spacing.medium}px;
`;
