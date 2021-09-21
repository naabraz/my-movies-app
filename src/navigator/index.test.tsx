import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './index';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('screens', () => ({
  PopularMovies: 'PopularMovies',
  MovieDetails: 'MovieDetails',
  MoviesByGenre: 'MoviesByGenre',
  GenreList: 'GenreList',
  FavoriteGenres: 'FavoriteGenres',
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
  expect(getAllByText('Genre List')).toBeTruthy();
});
