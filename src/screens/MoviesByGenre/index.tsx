import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { Box } from '@gympass/yoga';

import { Loading, Error, MoviesList } from 'src/components';
import { Genre, Movies as MoviesType } from './types';
import { MOVIES_BY_GENRE } from './index.graphql';

const MoviesByGenre: React.FC<Genre> = ({ route }: Genre) => {
  const {
    params: { id },
  } = route;
  const variables = { genreId: id };

  const { loading, data, error } = useQuery<MoviesType>(MOVIES_BY_GENRE, {
    variables,
  });

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <Box as={ScrollView} bg="stamina" showsVerticalScrollIndicator={false}>
      <Box alignSelf="center" mb="medium" width="300">
        {data?.moviesByGenre.map(movie => (
          <MoviesList movie={movie} key={movie.id} />
        ))}
      </Box>
    </Box>
  );
};

export default MoviesByGenre;
