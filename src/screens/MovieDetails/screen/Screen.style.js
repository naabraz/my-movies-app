import styled from 'styled-components/native';

import * as colors from 'style/colors';

export const Container = styled.ScrollView`
  background-color: ${colors.gallery};
`;

export const Details = styled.View`
  margin-vertical: 24px;
  margin-horizontal: 24px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${colors.ebonyClay};
`;

export const Text = styled.Text`
  color: ${colors.ebonyClay};
  margin-vertical: 12px;
`;

export const Image = styled.Image`
  width: 300px;
  height: 169px;
  margin-top: 24px;
  align-self: center;
`;
