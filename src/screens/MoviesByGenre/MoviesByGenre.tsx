import React from 'react';
import { useQuery } from 'react-apollo';

import { Loading, Error, MoviesList } from 'components';
import { Genre, Movies } from './MoviesByGenre.types';
import { MOVIES_BY_GENRE } from './MoviesByGenre.graphql';
import * as Styled from './MoviesByGenre.style';

export const MoviesByGenre: React.FC<Genre> = ({ route }: Genre) => {
  const {
    params: { id },
  } = route;
  const variables = { genreId: id };

  const { loading, data, error } = useQuery<Movies>(MOVIES_BY_GENRE, {
    variables,
  });

  if (loading) return <Loading />;

  if (error) return <Error />;

  const moviesList = data?.moviesByGenre.map(movie => (
    <MoviesList movie={movie} key={movie.id} />
  ));

  return (
    <Styled.Container>
      <Styled.Movies>{moviesList}</Styled.Movies>
    </Styled.Container>
  );
};
