import styled from 'styled-components/native';

import * as colors from 'style/colors';

export const Container = styled.ScrollView`
  background-color: ${colors.gallery};
`;

export const Details = styled.View`
  margin-vertical: 24px;
  margin-horizontal: 24px;
`;

export const Info = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${colors.ebonyClay};
`;

export const Text = styled.Text`
  color: ${colors.ebonyClay};
`;

export const Date = styled(Text)`
  margin-horizontal: 12px;
`;

export const Overview = styled(Text)`
  margin-vertical: 12px;
`;

export const Image = styled.Image`
  width: 300px;
  height: 169px;
  margin-top: 24px;
  align-self: center;
`;
