import React from 'react';

import { List } from './components';
import * as Styled from './Screen.style';

type Movies = {
  movies: {
    id: number;
    title: string;
    posterPath: string;
  }[];
};

const PopularMoviesScreen: React.FC<Movies> = ({ movies }: Movies) => {
  const moviesList = movies.map(movie => <List movie={movie} key={movie.id} />);

  return (
    <Styled.Container>
      <Styled.Movies>{moviesList}</Styled.Movies>
    </Styled.Container>
  );
};

export default PopularMoviesScreen;
