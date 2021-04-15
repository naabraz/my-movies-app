import React from 'react';
import { useQuery } from '@apollo/client';

import { Loading, Error, MoviesList } from 'components';
import { Genre, Movies as MoviesType } from './types';
import { MOVIES_BY_GENRE } from './index.graphql';
import { Container, Movies } from './styles';

const MoviesByGenre: React.FC<Genre> = ({ route }: Genre) => {
  const {
    params: { id },
  } = route;
  const variables = { genreId: id };

  const { loading, data, error } = useQuery<MoviesType>(MOVIES_BY_GENRE, {
    variables,
  });

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <Container>
      <Movies>
        {data?.moviesByGenre.map(movie => (
          <MoviesList movie={movie} key={movie.id} />
        ))}
      </Movies>
    </Container>
  );
};

export default MoviesByGenre;
