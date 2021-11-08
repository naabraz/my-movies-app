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

  return (
    <Box backgroundColor="stamina">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignSelf="center" mb="medium" width="300">
          {data?.popularMovies.map(movie => (
            <MoviesList movie={movie} key={movie.id} />
          ))}
        </Box>
        <Box mh="small" mv="small">
          <Text.SectionTitle color="energy">
            App Version: {getBuildNumber()}
          </Text.SectionTitle>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default PopularMovies;
