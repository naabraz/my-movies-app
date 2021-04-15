import React from 'react';
import { useQuery } from '@apollo/client';

import { Loading, Error, MoviesList } from 'components';
import { POPULAR_MOVIES } from './index.graphql';
import { Movies } from './types';
import * as Styled from './styles';

const PopularMovies: React.FC = () => {
  const { loading, data, error } = useQuery<Movies>(POPULAR_MOVIES);

  if (loading) return <Loading />;

  if (error) return <Error />;

  const moviesList = data?.popularMovies.map(movie => (
    <MoviesList movie={movie} key={movie.id} />
  ));

  return (
    <Styled.Container>
      <Styled.Movies>{moviesList}</Styled.Movies>
    </Styled.Container>
  );
};

export default PopularMovies;
