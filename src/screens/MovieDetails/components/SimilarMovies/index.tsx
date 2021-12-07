import React from 'react';
import { ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Box, Text } from '@gympass/yoga';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList, BottomTabParams } from 'src/navigator/types';

import { SimilarMovies } from './types';
import { SIMILAR_MOVIES } from './index.graphql.js';

type SimilarMoviesProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Home'>,
  BottomTabNavigationProp<BottomTabParams, 'Popular Movies'>
>;

const SimilarMoviesList: React.FC<{ id: string }> = ({ id }) => {
  const { navigate } = useNavigation<SimilarMoviesProp>();

  const variables = { movieId: id };

  const { loading, data, error } = useQuery<SimilarMovies>(SIMILAR_MOVIES, {
    variables,
  });

  const LoadingComponent = (
    <Box>
      <Text color="energy">...</Text>
    </Box>
  );

  const ErrorComponent = (
    <Box>
      <Text color="energy">There was an error</Text>
    </Box>
  );

  if (loading) return LoadingComponent;

  if (error) return ErrorComponent;

  const goToMovieDetail = movie => (): void =>
    navigate('Movie Details', { movie });

  const emptySimilarMovies = !data?.similarMovies.length;

  const EmptySimilarMoviesComponent = <Text>No similar movies found 😢</Text>;

  const SimilarMoviesComponent = (
    <Box as={ScrollView} horizontal showsHorizontalScrollIndicator={false}>
      {data?.similarMovies.map(movie => (
        <TouchableWithoutFeedback
          key={movie.id}
          onPress={goToMovieDetail(movie)}
          accessibilityLabel="Go to movie details"
        >
          <Box
            as={Image}
            key={movie.id}
            width="92"
            height="138"
            source={{ uri: movie.posterPath }}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            borderBottomLeftRadius={10}
            borderBottomRightRadius={10}
            mr="xxxsmall"
          />
        </TouchableWithoutFeedback>
      ))}
    </Box>
  );

  return (
    <Box>
      <Text.SectionTitle variant="energy" mv="small">
        Similar Movies
      </Text.SectionTitle>
      {emptySimilarMovies
        ? EmptySimilarMoviesComponent
        : SimilarMoviesComponent}
    </Box>
  );
};

export default SimilarMoviesList;
