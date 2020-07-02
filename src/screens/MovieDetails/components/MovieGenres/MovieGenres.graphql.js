import gql from 'graphql-tag';

export const MOVIE_GENRES = gql`
  query movieGenres($movieId: String!) {
    movieGenres(movieId: $movieId) {
      id
      name
    }
  }
`;
