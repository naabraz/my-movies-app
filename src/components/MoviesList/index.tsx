import React from 'react';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import { firebase } from 'src/services';
import { RootStackParamList, BottomTabParams } from 'src/navigator/types';

import { Movie } from './types';
import { Container, Poster, MovieInfoContainer, MovieTitle } from './styles';

type PopularMoviesProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Home'>,
  BottomTabNavigationProp<BottomTabParams, 'Popular Movies'>
>;

const MoviesList: React.FC<Movie> = ({ movie }: Movie) => {
  const { navigate } = useNavigation<PopularMoviesProp>();
  const { backdropPath } = movie;

  const goToDetailsScreen = (): void => {
    firebase.sendEvent('go_to_movie_details', {
      id: movie.id,
      movieTitle: movie.title,
    });

    navigate('Movie Details', { movie });
  };

  return (
    <TouchableWithoutFeedback
      onPress={goToDetailsScreen}
      accessibilityLabel="Go to movie details"
      accessibilityHint="Goes to movie details screen"
    >
      <Container>
        <Poster
          source={{ uri: backdropPath }}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
        />
        <MovieInfoContainer>
          <MovieTitle>{movie.title}</MovieTitle>
        </MovieInfoContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default MoviesList;
