import React from 'react';
import { NativeModules } from 'react-native';

import { render, fireEvent } from '@testing-library/react-native';
import * as APOLLO from '@apollo/client';

import GenreList from '.';

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

  const { getByTestId } = render(<GenreList />);

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

  const { getByTestId } = render(<GenreList />);

  expect(getByTestId('ErrorAnimation')).toBeTruthy();
});

test('should render genre list', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    called: true,
  });

  const { getByText } = render(<GenreList />);
  const genre = getByText('Action');

  fireEvent.press(genre);

  expect(genre).toBeTruthy();
});

test('should call secure storage save value method', () => {
  const { SecureStorage } = NativeModules;

  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    called: true,
  });

  const { getByText } = render(<GenreList />);

  fireEvent.press(getByText('Action'));
  fireEvent.press(getByText('Save'));

  expect(SecureStorage.setValue).toHaveBeenCalled();
});

test('should remove genre if clicked twice', () => {
  const { SecureStorage } = NativeModules;

  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    called: true,
  });

  const { getByText } = render(<GenreList />);
  const [, genre] = data.genreList;

  fireEvent.press(getByText('Animation'));
  fireEvent.press(getByText('Animation'));
  fireEvent.press(getByText('Adventure'));
  fireEvent.press(getByText('Save'));

  expect(SecureStorage.setValue).toHaveBeenCalledWith(
    'FAVORITE_GENRES',
    JSON.stringify([genre]),
  );
});
