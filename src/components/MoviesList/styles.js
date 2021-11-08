import styled from 'styled-components/native';
import { Text } from '@gympass/yoga';

export const Poster = styled.Image.attrs({
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
})`
  width: 300px;
  height: 169px;
`;

export const MovieTitle = styled(Text.Small)`
  text-transform: uppercase;
`;
