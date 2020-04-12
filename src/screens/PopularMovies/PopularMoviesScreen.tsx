import React from 'react';
import { ScrollView } from 'react-native';

import { PopularMoviesList } from './components';
import { PopularMoviesScreenView } from './PopularMoviesScreen.styles';

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
    <ScrollView>
      <PopularMoviesScreenView>{moviesList}</PopularMoviesScreenView>
    </ScrollView>
  );
};

export default PopularMoviesScreen;
