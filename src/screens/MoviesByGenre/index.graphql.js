import { gql } from '@apollo/client';

export const MOVIES_BY_GENRE = gql`
  query moviesByGenre($genreId: Int!) {
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
