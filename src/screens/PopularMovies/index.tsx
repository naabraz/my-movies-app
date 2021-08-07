import React from 'react';
import { useQuery } from '@apollo/client';
import { getBuildNumber } from 'react-native-device-info';

import { Loading, Error, MoviesList } from 'components';
import { POPULAR_MOVIES } from './index.graphql';
import { Movies as MoviesType } from './types';
import { Container, Movies, Version } from './styles';

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
      <Version>App Version: {getBuildNumber()}</Version>
    </Container>
  );
};

export default PopularMovies;
