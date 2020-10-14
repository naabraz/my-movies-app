import React from 'react';
import { render, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import wait from 'waait';

import { StackNavigator } from './';

jest.mock('screens', () => ({
  PopularMovies: 'PopularMovies',
  MovieDetails: 'MovieDetails',
  MoviesByGenre: 'MoviesByGenre',
}));

describe('Given navigator component', () => {
  it('Should render Stack Navigator with Popular Movies screen', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>,
    );

    await act(() => wait(0));

    expect(getByText('Popular Movies')).toBeTruthy();
  });
});
