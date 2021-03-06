import gql from 'graphql-tag';

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
