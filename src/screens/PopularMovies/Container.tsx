import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Loading, Error } from '../../components';
import { PopularMoviesScreen } from './Screen';
import { PopularMovies } from './Container.types';
import { POPULAR_MOVIES } from './PopularMovies.graphql';

export const PopularMoviesContainer: React.FC = () => {
  const { loading, data } = useQuery<PopularMovies>(POPULAR_MOVIES);

  if (loading) return <Loading />;

  return data ? (
    <PopularMoviesScreen movies={data?.popularMovies} />
  ) : (
    <Error />
  );
};
