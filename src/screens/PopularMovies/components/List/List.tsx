import React from 'react';

import { Movie } from './List.types';
import * as Styled from './List.style.js';

export const PopularMoviesList: React.FC<Movie> = ({ movie }: Movie) => {
  const { posterPath } = movie;
  return (
    <Styled.Container>
      <Styled.Poster
        source={{ uri: posterPath }}
        resizeMode="cover"
        borderRadius={10}
        testID="MoviePoster"
      />
    </Styled.Container>
  );
};
