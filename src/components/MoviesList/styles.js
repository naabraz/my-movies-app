import styled from 'styled-components/native';

import * as colors from 'style/colors';

export const Container = styled.View`
  width: 300px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-horizontal: 4px;
  margin-vertical: 4px;
  border-radius: 10px;
  background-color: ${colors.ebonyClay};
  box-shadow: 2px 2px 2px #ccc;
`;

export const Poster = styled.Image`
  width: 300px;
  height: 169px;
`;

export const MovieInfoContainer = styled.View`
  flex: 1;
  margin-vertical: 12px;
  margin-horizontal: 12px;
`;

export const MovieTitle = styled.Text`
  align-self: center;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: ${colors.white};
`;
