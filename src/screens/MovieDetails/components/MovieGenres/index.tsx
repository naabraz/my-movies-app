import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { GenreButton } from 'src/components';
import { firebase } from 'src/services';

import { GenreInfo } from './styles';
import { MovieGenres } from './types';
import { MOVIE_GENRES } from './index.graphql.js';

const MovieGenresList: React.FC<{ id: string }> = ({ id }) => {
  const { navigate } = useNavigation();
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
