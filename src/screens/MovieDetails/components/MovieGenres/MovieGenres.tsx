import React from 'react';
import { useQuery } from 'react-apollo';
import { useNavigation } from '@react-navigation/native';

import * as Styled from './MovieGenres.style';
import { MovieGenres } from './MovieGenres.types';
import { MOVIE_GENRES } from './MovieGenres.graphql.js';

export const MovieGenresList: React.FC<{ id: string }> = ({ id }) => {
  const { navigate } = useNavigation();
  const variables = { movieId: id };
  const { loading, data, error } = useQuery<MovieGenres>(MOVIE_GENRES, {
    variables,
  });

  const goToMoviesByGenreScreen = (genreId, name) => (): void =>
    navigate('Movie By Genre', { id: genreId, name });

  const loadingComponent = (
    <Styled.LoadingContainer testID="Loading">
      <Styled.LoadingText>...</Styled.LoadingText>
    </Styled.LoadingContainer>
  );

  const errorComponent = (
    <Styled.ErrorContainer testID="Error">
      <Styled.ErrorText>-</Styled.ErrorText>
    </Styled.ErrorContainer>
  );

  if (loading) return loadingComponent;

  if (error) return errorComponent;

  return (
    <Styled.GenreInfo>
      {data?.movieGenres.map(({ id: genreId, name }) => (
        <Styled.GenreButton
          key={genreId}
          onPress={goToMoviesByGenreScreen(genreId, name)}
        >
          <Styled.GenreTitle>{name}</Styled.GenreTitle>
        </Styled.GenreButton>
      ))}
    </Styled.GenreInfo>
  );
};
