import { gql } from '@apollo/client';

export const POPULAR_MOVIES = gql`
  query popularMovies {
    popularMovies {
      id
      title
      posterPath
      backdropPath
      overview
      releaseDate
      voteAverage
    }
  }
`;
