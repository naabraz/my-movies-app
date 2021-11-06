import React from 'react';
import { Text } from '@gympass/yoga';
import { useQuery } from '@apollo/client';
import { getBuildNumber } from 'react-native-device-info';

import { Loading, Error, MoviesList } from 'src/components';
import { POPULAR_MOVIES } from './index.graphql';
import { Movies as MoviesType } from './types';
import { List, Movies, Version } from './styles';

const PopularMovies: React.FC = () => {
  const { loading, data, error } = useQuery<MoviesType>(POPULAR_MOVIES);

  if (loading) return <Loading />;

  if (error) return <Error />;

  const moviesList = data?.popularMovies.map(movie => (
    <MoviesList movie={movie} key={movie.id} />
  ));

  return (
    <List showsVerticalScrollIndicator={false}>
      <Text>Yoga</Text>
      <Movies>{moviesList}</Movies>
      <Version>App Version: {getBuildNumber()}</Version>
    </List>
  );
};

export default PopularMovies;
