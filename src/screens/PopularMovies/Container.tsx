import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import PopularMoviesScreen from './Screen';
import { PopularMovies } from './Container.types';
import { POPULAR_MOVIES } from './PopularMovies.graphql';
import { Loading } from '../../components';

const PopularMoviesContainer: React.FC = () => {
  const { loading, data } = useQuery<PopularMovies>(POPULAR_MOVIES);

  if (loading) return <Loading />;

  return data ? (
    <PopularMoviesScreen movies={data?.popularMovies} />
  ) : (
    <View>
      <Text>No Movies Found</Text>
    </View>
  );
};

export default PopularMoviesContainer;
