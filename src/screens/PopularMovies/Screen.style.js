import styled from 'styled-components/native';

import * as colors from '../../style/colors';

export const Container = styled.ScrollView`
  background-color: ${colors.gallery};
`;

export const Movies = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;
