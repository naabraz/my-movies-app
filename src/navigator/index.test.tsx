import React from 'react';
import { render } from 'src/utils/tests';

import StackNavigator from './index';

jest.useFakeTimers();

jest.mock('screens', () => ({
  PopularMovies: 'PopularMovies',
  MovieDetails: 'MovieDetails',
  MoviesByGenre: 'MoviesByGenre',
  FavoriteGenre: 'FavoriteGenre',
}));

test('should render Stack Navigator with Popular Movies screen', () => {
  const { getAllByText } = render(<StackNavigator />);

  expect(getAllByText('Popular Movies')).toBeTruthy();
});

test('should render Stack Navigator with tab navigator', () => {
  const { getAllByText } = render(<StackNavigator />);

  expect(getAllByText('Popular Movies')).toBeTruthy();
  expect(getAllByText('Favorite Genre')).toBeTruthy();
});
