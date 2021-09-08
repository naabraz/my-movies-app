import styled from 'styled-components/native';

import * as colors from 'src/style/colors';

export const Button = styled.TouchableHighlight`
  padding: 12px;
  border-radius: 8px;
  background-color: ${props =>
    props.selected ? colors.bondiBlue : colors.ebonyClay};
  margin-right: 12px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.gallery};
`;
