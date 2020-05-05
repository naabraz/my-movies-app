import React from 'react';

import * as Styled from './PopularMoviesList.styles';

type Movie = {
  movie: {
    id: number;
    title: string;
    posterPath: string;
  };
};

const PopularMoviesList: React.FC<Movie> = ({ movie }: Movie) => {
  const { posterPath } = movie;
  return (
    <Styled.Container>
      <Styled.Poster source={{ uri: posterPath }} />
    </Styled.Container>
  );
};

export default PopularMoviesList;
