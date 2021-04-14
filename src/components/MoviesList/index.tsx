import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Movie } from './types';
import {
  Container,
  Button,
  Poster,
  MovieInfoContainer,
  MovieTitle,
} from './styles';

const MoviesList: React.FC<Movie> = ({ movie }: Movie) => {
  const { navigate } = useNavigation();
  const { backdropPath } = movie;

  const goToDetailsScreen = (): void => navigate('Movie Details', { movie });

  return (
    <Button
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
    </Button>
  );
};

export default MoviesList;
