import React from 'react';
import { render } from 'react-native-testing-library';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from './';

jest.mock('screens', () => ({
  PopularMoviesContainer: 'PopularMoviesContainer',
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
