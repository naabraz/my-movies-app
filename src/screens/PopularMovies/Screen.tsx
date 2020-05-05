import React from 'react';

import { List } from './components';
import * as Styled from './Screen.style';
import { Movies } from './Screen.types';

const PopularMoviesScreen: React.FC<Movies> = ({ movies }: Movies) => {
  const moviesList = movies.map(movie => <List movie={movie} key={movie.id} />);

  return (
    <Styled.Container>
      <Styled.Movies>{moviesList}</Styled.Movies>
    </Styled.Container>
  );
};

export default PopularMoviesScreen;
