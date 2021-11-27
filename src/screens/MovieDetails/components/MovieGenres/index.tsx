import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import { GenreButton } from 'src/components';
import { firebase } from 'src/services';
import { RootStackParamList, BottomTabParams } from 'src/navigator/types';

import { GenreInfo } from './styles';
import { MovieGenres } from './types';
import { MOVIE_GENRES } from './index.graphql.js';

type MovieGenreListProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Home'>,
  BottomTabNavigationProp<BottomTabParams, 'Popular Movies'>
>;

const MovieGenresList: React.FC<{ id: string }> = ({ id }) => {
  const { navigate } = useNavigation<MovieGenreListProp>();
  const variables = { movieId: id };
  const { loading, data, error } = useQuery<MovieGenres>(MOVIE_GENRES, {
    variables,
  });

  const goToMoviesByGenreScreen = (genreId, name) => (): void => {
    firebase.sendEvent('filter_by_genre', {
      genreId,
      genreName: name,
    });

    navigate('Movie By Genre', { id: genreId, name });
  };

  if (loading)
    return (
      <View>
        <Text>...</Text>
      </View>
    );

  if (error)
    return (
      <View>
        <Text>There was an error</Text>
      </View>
    );

  return (
    <GenreInfo>
      {data?.movieGenres.map(({ id: genreId, name }) => (
        <GenreButton
          key={genreId}
          title={name}
          onPress={goToMoviesByGenreScreen(genreId, name)}
        />
      ))}
    </GenreInfo>
  );
};

export default MovieGenresList;
