import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import PopularMoviesScreen from './PopularMoviesScreen';
import { PopularMoviesData } from './interfaces/PopularMoviesInterface';
import { POPULAR_MOVIES } from './PopularMovies.graphql';

const PopularMoviesContainer = () => {
  const { loading, data } = useQuery<PopularMoviesData>(POPULAR_MOVIES);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return data 
  ? (<PopularMoviesScreen movies={data?.popularMovies} />)
  : (<View><Text>No Movies Found</Text></View>)
};

export default PopularMoviesContainer;
