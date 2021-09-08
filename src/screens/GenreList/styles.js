import styled from 'styled-components/native';

import * as colors from 'src/style/colors';

export const Genres = styled.View`
  padding-vertical: 12px;
  padding-horizontal: 12px;
`;

export const Title = styled.Text`
  padding-vertical: 12px;
  font-size: 16px;
  text-align: center;
`;

export const List = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Button = styled.TouchableHighlight`
  background-color: ${colors.ebonyClay};
  padding: 18px;
  border-radius: 8px;
  margin-top: 72px;
`;

export const Text = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: ${colors.gallery};
`;
