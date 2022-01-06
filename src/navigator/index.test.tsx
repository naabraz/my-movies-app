import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './index';

jest.useFakeTimers();

jest.mock('screens', () => ({
  PopularMovies: 'PopularMovies',
  MovieDetails: 'MovieDetails',
  MoviesByGenre: 'MoviesByGenre',
  FavoriteGenre: 'FavoriteGenre',
}));

test('should render Stack Navigator with Popular Movies screen', () => {
  const { getAllByText } = render(
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>,
  );

  expect(getAllByText('Popular Movies')).toBeTruthy();
});

test('should render Stack Navigator with tab navigator', () => {
  const { getAllByText } = render(
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>,
  );

  expect(getAllByText('Popular Movies')).toBeTruthy();
  expect(getAllByText('Favorite Genre')).toBeTruthy();
});
