import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Movie } from './List.types';
import * as Styled from './List.style.js';
import { AppStackParamList } from 'navigator';

type ListNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Movie Details'
>;

export const PopularMoviesList: React.FC<Movie> = ({ movie }: Movie) => {
  const navigation = useNavigation<ListNavigationProp>();
  const { backdropPath } = movie;

  const goToDetailsScreen = (): void => navigation.navigate('Movie Details');

  return (
    <Styled.Button onPress={goToDetailsScreen}>
      <Styled.Container>
        <Styled.Poster
          source={{ uri: backdropPath }}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          testID="MoviePoster"
        />
        <Styled.MovieInfoContainer>
          <Styled.MovieTitle>{movie.title}</Styled.MovieTitle>
        </Styled.MovieInfoContainer>
      </Styled.Container>
    </Styled.Button>
  );
};
