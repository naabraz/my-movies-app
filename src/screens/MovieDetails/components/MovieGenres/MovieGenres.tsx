import React from 'react';
import { useQuery } from 'react-apollo';

import * as Styled from './MovieGenres.style';
import { MovieGenres } from './MovieGenres.types';
import { MOVIE_GENRES } from './MovieGenres.graphql.js';

export const MovieGenresList: React.FC<{ id: string }> = ({ id }) => {
  const variables = { movieId: id };
  const { loading, data } = useQuery<MovieGenres>(MOVIE_GENRES, { variables });

  const loadingComponent = (
    <Styled.LoadingContainer>
      <Styled.LoadingText>...</Styled.LoadingText>
    </Styled.LoadingContainer>
  );

  if (loading) return loadingComponent;

  return (
    <Styled.GenreInfo>
      {data?.movieGenres.map(({ id: genreId, name }) => (
        <Styled.Genre key={genreId}>{name}</Styled.Genre>
      ))}
    </Styled.GenreInfo>
  );
};
