import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Movie } from './List.types';
import * as Styled from './List.style.js';

export const PopularMoviesList: React.FC<Movie> = ({ movie }: Movie) => {
  const { navigate } = useNavigation();
  const { backdropPath } = movie;

  const goToDetailsScreen = (): void => navigate('Movie Details', { movie });

  return (
    <Styled.Button onPress={goToDetailsScreen} testID="Button">
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
