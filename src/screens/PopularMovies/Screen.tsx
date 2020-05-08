import React from 'react';

import { PopularMoviesList } from './components';
import { Movies } from './Screen.types';
import * as Styled from './Screen.style';

export const PopularMoviesScreen: React.FC<Movies> = ({ movies }: Movies) => {
  const moviesList = movies.map(movie => (
    <PopularMoviesList movie={movie} key={movie.id} />
  ));

  return (
    <Styled.Container>
      <Styled.Movies>{moviesList}</Styled.Movies>
    </Styled.Container>
  );
};
