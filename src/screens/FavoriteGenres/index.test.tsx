import React from 'react';
import { NativeModules } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';

import FavoriteGenres from './index';

const navContext = {
  isFocused: (): boolean => true,
  addListener: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  goBack: jest.fn(),
  navigate: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  canGoBack: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
  removeListener: jest.fn(),
  setOptions: jest.fn(),
  jumpTo: jest.fn(),
};

test('should render saved favorite genres', async () => {
  const { SecureStorage } = NativeModules;

  const genres = '[{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"}]';

  SecureStorage.getValue.mockReturnValue(genres);

  const { getByText } = render(
    <NavigationContext.Provider value={navContext}>
      <FavoriteGenres />
    </NavigationContext.Provider>,
  );

  await waitFor(() => {
    expect(getByText('TV Movie')).toBeTruthy();
    expect(getByText('Thriller')).toBeTruthy();
  });
});
