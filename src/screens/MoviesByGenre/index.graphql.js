import gql from 'graphql-tag';

export const MOVIES_BY_GENRE = gql`
  query moviesByGenre($genreId: ID!) {
    moviesByGenre(genreId: $genreId) {
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
