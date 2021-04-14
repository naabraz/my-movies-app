import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from 'react-apollo';
import { useNavigation } from '@react-navigation/native';

import { GenreInfo, GenreButton, GenreTitle } from './styles';
import { MovieGenres } from './types';
import { MOVIE_GENRES } from './index.graphql.js';

const MovieGenresList: React.FC<{ id: string }> = ({ id }) => {
  const { navigate } = useNavigation();
  const variables = { movieId: id };
  const { loading, data, error } = useQuery<MovieGenres>(MOVIE_GENRES, {
    variables,
  });

  const goToMoviesByGenreScreen = (genreId, name) => (): void =>
    navigate('Movie By Genre', { id: genreId, name });

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
          onPress={goToMoviesByGenreScreen(genreId, name)}
        >
          <GenreTitle>{name}</GenreTitle>
        </GenreButton>
      ))}
    </GenreInfo>
  );
};

export default MovieGenresList;
