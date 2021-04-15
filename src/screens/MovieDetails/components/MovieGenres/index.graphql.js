import { gql } from '@apollo/client';

export const MOVIE_GENRES = gql`
  query movieGenres($movieId: String!) {
    movieGenres(movieId: $movieId) {
      id
      name
    }
  }
`;
