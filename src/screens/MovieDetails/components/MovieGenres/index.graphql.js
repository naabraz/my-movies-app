import { gql } from '@apollo/client';

export const MOVIE_GENRES = gql`
  query movieGenres($movieId: Int!) {
    movieGenres(movieId: $movieId) {
      id
      name
    }
  }
`;
