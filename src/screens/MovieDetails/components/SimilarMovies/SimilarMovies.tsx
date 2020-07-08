import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-apollo';

import * as Styled from './SimilarMovies.style';
import { SimilarMovies } from './SimilarMovies.types';
import { SIMILAR_MOVIES } from './SimilarMovies.graphql.js';

export const SimilarMoviesList: React.FC<{ id: string }> = ({ id }) => {
  const { navigate } = useNavigation();

  const variables = { movieId: id };

  const { loading, data, error } = useQuery<SimilarMovies>(SIMILAR_MOVIES, {
    variables,
  });

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

  const goToMovieDetail = (movie): Function => (): void =>
    navigate('Movie Details', { movie });

  return (
    <Styled.Container>
      <Styled.Title>Similar Movies</Styled.Title>
      <Styled.List horizontal showsHorizontalScrollIndicator={false}>
        {data?.similarMovies.map(movie => (
          <Styled.Button
            key={movie.id}
            onPress={goToMovieDetail(movie)}
            testID="Button"
          >
            <Styled.Poster
              key={movie.id}
              source={{ uri: movie.posterPath }}
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              borderBottomLeftRadius={10}
              borderBottomRightRadius={10}
              testID="MoviePoster"
            />
          </Styled.Button>
        ))}
      </Styled.List>
    </Styled.Container>
  );
};
