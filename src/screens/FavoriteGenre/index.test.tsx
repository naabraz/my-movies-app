import React from 'react';
import { NativeModules } from 'react-native';

import { render, fireEvent, waitFor } from '@testing-library/react-native';
import * as APOLLO from '@apollo/client';
import { ThemeProvider } from '@gympass/yoga';

import FavoriteGenre from '.';

const useQueryMock = jest.spyOn(APOLLO, 'useQuery');

const queryResultMock = {
  client: new APOLLO.ApolloClient({
    uri: '',
    cache: new APOLLO.InMemoryCache(),
  }),
  networkStatus: 1,
  refetch: jest.fn(),
  startPolling: jest.fn(),
  stopPolling: jest.fn(),
  subscribeToMore: jest.fn(),
  updateQuery: jest.fn(),
  variables: null,
  fetchMore: jest.fn(),
};

const data = {
  genreList: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
  ],
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('should render Loading component when data is not ready', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data: undefined,
    loading: true,
    called: true,
  });

  const { getByTestId } = render(
    <ThemeProvider>
      <FavoriteGenre />
    </ThemeProvider>,
  );

  expect(getByTestId('LoadingAnimation')).toBeTruthy();
});

test('should render Error component when there is an error', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data: undefined,
    loading: false,
    error: new APOLLO.ApolloError({}),
    called: true,
  });

  const { getByTestId } = render(
    <ThemeProvider>
      <FavoriteGenre />
    </ThemeProvider>,
  );

  expect(getByTestId('ErrorAnimation')).toBeTruthy();
});

test('should render genre list', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    called: true,
  });

  const { getByText } = render(
    <ThemeProvider>
      <FavoriteGenre />
    </ThemeProvider>,
  );

  const genre = getByText('Action');

  expect(genre).toBeTruthy();
});

test('should render selected favorite genre when it exists', async () => {
  const { SecureStorage } = NativeModules;

  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    called: true,
  });

  render(
    <ThemeProvider>
      <FavoriteGenre />
    </ThemeProvider>,
  );

  SecureStorage.getValue.mockReturnValueOnce(
    JSON.stringify({ id: 28, name: 'Action' }),
  );

  await waitFor(() =>
    expect(SecureStorage.getValue).toHaveBeenCalledWith('FAVORITE_GENRES'),
  );
});

test('should call secure storage save value method', async () => {
  const { SecureStorage } = NativeModules;

  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    called: true,
  });

  const { getAllByA11yRole } = render(
    <ThemeProvider>
      <FavoriteGenre />
    </ThemeProvider>,
  );

  const [movieGenre] = getAllByA11yRole('switch');

  fireEvent(movieGenre, 'onChange', true);

  await waitFor(() =>
    expect(SecureStorage.setValue).toHaveBeenCalledWith(
      'FAVORITE_GENRES',
      JSON.stringify({ id: 28, name: 'Action' }),
    ),
  );
});
