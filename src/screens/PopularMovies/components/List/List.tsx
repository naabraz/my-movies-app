import React from 'react';

import { Movie } from './List.types';
import * as Styled from './List.style.js';

export const PopularMoviesList: React.FC<Movie> = ({ movie }: Movie) => {
  const { backdropPath } = movie;
  return (
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
  );
};
