import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { getBuildNumber } from 'react-native-device-info';
import { Text, Box } from '@gympass/yoga';

import { Loading, Error, MoviesList } from 'src/components';
import { POPULAR_MOVIES } from './index.graphql';
import { Movies as MoviesType } from './types';

const PopularMovies: React.FC = () => {
  const { loading, data, error } = useQuery<MoviesType>(POPULAR_MOVIES);

  if (loading) return <Loading />;

  if (error) return <Error />;

  const moviesList = data?.popularMovies.map(movie => (
    <MoviesList movie={movie} key={movie.id} />
  ));

  return (
    <Box mh="small" mv="small">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignSelf="center" mb="medium">
          {moviesList}
        </Box>
        <Text.SectionTitle color="medium">
          App Version: {getBuildNumber()}
        </Text.SectionTitle>
      </ScrollView>
    </Box>
  );
};

export default PopularMovies;
