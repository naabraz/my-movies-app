import styled from 'styled-components/native';

import * as colors from 'src/style/colors';

export const Button = styled.TouchableHighlight`
  padding: 8px;
  border-radius: 8px;
  background-color: ${colors.ebonyClay};
  margin-right: 12px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.gallery};
`;
