import React from 'react';

import { MovieView, MoviePoster } from './PopularMoviesList.styles';

type Movie = {
  movie: {
    id: number;
    title: string;
    posterPath: string;
  };
};

const PopularMoviesList = ({ movie }: Movie) => {
  const { posterPath } = movie;
  return (
    <MovieView>
      <MoviePoster source={{ uri: posterPath }} />
    </MovieView>
  );
};

export default PopularMoviesList;
