import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider } from '@gympass/yoga';

import MoviesList from './index';

const movie = {
  id: 1,
  title: 'movieTitle',
  posterPath: 'fooPath',
  backdropPath: 'fooBackdropPath',
};

test('should navigate to Movie Details screen when poster is clicked', () => {
  const { getByText } = render(
    <ThemeProvider>
      <MoviesList movie={movie} />
    </ThemeProvider>,
  );

  fireEvent.press(getByText('movieTitle'));

  expect(useNavigation().navigate).toHaveBeenCalledWith('Movie Details', {
    movie,
  });
});
