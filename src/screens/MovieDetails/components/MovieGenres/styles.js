import styled from 'styled-components/native';

import * as colors from 'src/style/colors';

export const GenreInfo = styled.View`
  flex-direction: row;
  margin-vertical: 12px;
  align-self: flex-start;
  flex-wrap: wrap;
`;

export const GenreButton = styled.TouchableHighlight`
  padding: 8px;
  border-radius: 8px;
  background-color: ${colors.ebonyClay};
  margin-right: 12px;
  margin-bottom: 12px;
`;

export const GenreTitle = styled.Text`
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.gallery};
`;
