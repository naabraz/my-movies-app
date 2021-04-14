import gql from 'graphql-tag';

export const SIMILAR_MOVIES = gql`
  query similarMovies($movieId: String!) {
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
