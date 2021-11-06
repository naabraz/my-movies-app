import styled from 'styled-components/native';
import { theme } from '@gympass/yoga';

const { spacing } = theme;

export const List = styled.ScrollView`
  margin-horizontal: ${spacing.small}px;
  margin-vertical: ${spacing.large}px;
`;

export const Movies = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;
