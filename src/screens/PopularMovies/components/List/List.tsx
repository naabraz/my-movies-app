import React from 'react';

import * as Styled from './List.styles';

type Movie = {
  movie: {
    id: number;
    title: string;
    posterPath: string;
  };
};

const PopularMoviesList: React.FC<Movie> = ({ movie }: Movie) => {
  const { posterPath } = movie;
  return <Styled.Poster source={{ uri: posterPath }} resizeMode="contain" />;
};

export default PopularMoviesList;
