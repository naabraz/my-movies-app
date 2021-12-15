import { gql } from '@apollo/client';

export const GENRES = gql`
  query genreListScreen {
    genreList {
      id
      name
    }
  }
`;
