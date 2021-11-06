import styled from 'styled-components/native';

import * as colors from 'src/style/colors';

export const List = styled.ScrollView`
  margin-horizontal: 16px;
  margin-vertical: 16px;
`;

export const Movies = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

export const Version = styled.Text`
  margin-top: 12px;
  font-size: 8px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.ebonyClay};
`;
