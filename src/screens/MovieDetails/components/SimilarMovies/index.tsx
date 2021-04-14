import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-apollo';

import { Container, Title, List, Poster } from './styles';
import { SimilarMovies } from './types';
import { SIMILAR_MOVIES } from './index.graphql.js';

const SimilarMoviesList: React.FC<{ id: string }> = ({ id }) => {
  const { navigate } = useNavigation();

  const variables = { movieId: id };

  const { loading, data, error } = useQuery<SimilarMovies>(SIMILAR_MOVIES, {
    variables,
  });

  const LoadingComponent = (
    <View>
      <Text>...</Text>
    </View>
  );

  const ErrorComponent = (
    <View>
      <Text>There was an error</Text>
    </View>
  );

  if (loading) return LoadingComponent;

  if (error) return ErrorComponent;

  const goToMovieDetail = movie => (): void =>
    navigate('Movie Details', { movie });

  const emptySimilarMovies = !data?.similarMovies.length;

  const EmptySimilarMoviesComponent = <Text>No similar movies found 😢</Text>;

  const SimilarMoviesComponent = (
    <List horizontal showsHorizontalScrollIndicator={false}>
      {data?.similarMovies.map(movie => (
        <TouchableWithoutFeedback
          key={movie.id}
          onPress={goToMovieDetail(movie)}
          accessibilityLabel="Go to movie details"
        >
          <Poster
            key={movie.id}
            source={{ uri: movie.posterPath }}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            borderBottomLeftRadius={10}
            borderBottomRightRadius={10}
          />
        </TouchableWithoutFeedback>
      ))}
    </List>
  );

  return (
    <Container>
      <Title>Similar Movies</Title>
      {emptySimilarMovies
        ? EmptySimilarMoviesComponent
        : SimilarMoviesComponent}
    </Container>
  );
};

export default SimilarMoviesList;
