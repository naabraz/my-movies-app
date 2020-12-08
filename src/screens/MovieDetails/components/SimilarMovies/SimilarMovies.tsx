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

  const LoadingComponent = (
    <Styled.LoadingContainer>
      <Styled.LoadingText>...</Styled.LoadingText>
    </Styled.LoadingContainer>
  );

  const ErrorComponent = (
    <Styled.ErrorContainer>
      <Styled.ErrorText>There was an error</Styled.ErrorText>
    </Styled.ErrorContainer>
  );

  if (loading) return LoadingComponent;

  if (error) return ErrorComponent;

  const goToMovieDetail = (movie): Function => (): void =>
    navigate('Movie Details', { movie });

  const emptySimilarMovies = !data?.similarMovies.length;

  const EmptySimilarMoviesComponent = (
    <Styled.NoSimilarMovies>No similar movies found :(</Styled.NoSimilarMovies>
  );

  const SimilarMoviesComponent = (
    <Styled.List horizontal showsHorizontalScrollIndicator={false}>
      {data?.similarMovies.map(movie => (
        <Styled.Button
          key={movie.id}
          onPress={goToMovieDetail(movie)}
          accessibilityLabel="Go to movie details"
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
  );

  return (
    <Styled.Container>
      <Styled.Title>Similar Movies</Styled.Title>
      {emptySimilarMovies
        ? EmptySimilarMoviesComponent
        : SimilarMoviesComponent}
    </Styled.Container>
  );
};
