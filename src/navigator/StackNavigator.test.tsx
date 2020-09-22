import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from './';

jest.mock('screens', () => ({
  PopularMovies: 'PopularMovies',
  MovieDetails: 'MovieDetails',
  MoviesByGenre: 'MoviesByGenre',
}));

describe('Given navigator component', () => {
  it('Should render Stack Navigator with Popular Movies screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>,
    );

    expect(getByText('Popular Movies')).toBeTruthy();
  });
});
