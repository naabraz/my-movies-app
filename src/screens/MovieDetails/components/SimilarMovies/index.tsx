import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList, BottomTabParams } from 'src/navigator/types';

import { Container, Title, Poster } from './styles';
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
    <View>
      <Text>...</Text>
    </View>
  );

  const ErrorComponent = (
    <View>
      <Text>There was an error</Text>
    </View>
  );

  if (loading) return LoadingComponent;

  if (error) return ErrorComponent;

  const goToMovieDetail = movie => (): void =>
    navigate('Movie Details', { movie });

  const emptySimilarMovies = !data?.similarMovies.length;

  const EmptySimilarMoviesComponent = <Text>No similar movies found 😢</Text>;

  const SimilarMoviesComponent = (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data?.similarMovies.map(movie => (
        <TouchableWithoutFeedback
          key={movie.id}
          onPress={goToMovieDetail(movie)}
          accessibilityLabel="Go to movie details"
        >
          <Poster
            key={movie.id}
            source={{ uri: movie.posterPath }}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            borderBottomLeftRadius={10}
            borderBottomRightRadius={10}
          />
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );

  return (
    <Container>
      <Title>Similar Movies</Title>
      {emptySimilarMovies
        ? EmptySimilarMoviesComponent
        : SimilarMoviesComponent}
    </Container>
  );
};

export default SimilarMoviesList;
