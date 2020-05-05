import React from 'react';

import { PopularMoviesList } from './components';
import * as Styled from './PopularMoviesScreen.styles';

type Movies = {
  movies: {
    id: number;
    title: string;
    posterPath: string;
  }[];
};

const PopularMoviesScreen: React.FC<Movies> = ({ movies }: Movies) => {
  const moviesList = movies.map(movie => (
    <PopularMoviesList movie={movie} key={movie.id} />
  ));

  return (
    <Styled.Container>
      <Styled.Movies>{moviesList}</Styled.Movies>
    </Styled.Container>
  );
};

export default PopularMoviesScreen;
