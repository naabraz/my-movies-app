import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from './index';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
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

    const popularMovies = await waitFor(() => getByText('Popular Movies'));

    expect(popularMovies).toBeTruthy();
  });
});
