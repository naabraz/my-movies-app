import React from 'react';
import { useQuery } from '@apollo/client';

import { Loading, Error, MoviesList } from 'components';
import { POPULAR_MOVIES } from './index.graphql';
import { Movies as MoviesType } from './types';
import { Container, Movies } from './styles';

const PopularMovies: React.FC = () => {
  const { loading, data, error } = useQuery<MoviesType>(POPULAR_MOVIES);

  if (loading) return <Loading />;

  if (error) return <Error />;

  const moviesList = data?.popularMovies.map(movie => (
    <MoviesList movie={movie} key={movie.id} />
  ));

  return (
    <Container>
      <Movies>{moviesList}</Movies>
    </Container>
  );
};

export default PopularMovies;
