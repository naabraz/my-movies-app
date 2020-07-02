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
  margin-vertical: 12px;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.ebonyClay};
`;

export const Text = styled.Text`
  color: ${colors.ebonyClay};
`;

export const Date = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

export const Year = styled(Text)`
  font-size: 12px;
  margin-horizontal: 12px;
`;

export const Overview = styled(Text)`
  margin-vertical: 12px;
`;

export const Poster = styled.Image`
  width: 300px;
  height: 169px;
  margin-top: 24px;
  align-self: center;
`;
