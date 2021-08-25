import { gql } from '@apollo/client';

export const SIMILAR_MOVIES = gql`
  query similarMovies($movieId: Int!) {
    similarMovies(movieId: $movieId) {
      id
      title
      posterPath
      releaseDate
      overview
      backdropPath
      voteAverage
    }
  }
`;
