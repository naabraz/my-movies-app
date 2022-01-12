import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import * as APOLLO from '@apollo/client';

import { render, RenderAPI } from 'src/utils/tests';

import MovieGenresList from './index';

const useQueryMock = jest.spyOn(APOLLO, 'useQuery');

const data = {
  movieGenres: [
    {
      id: 1,
      name: 'genreOne',
    },
    {
      id: 2,
      name: 'genreTwo',
    },
  ],
};

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

beforeEach(() => {
  jest.clearAllMocks();
});

const setup = (): RenderAPI => render(<MovieGenresList id="1" />);

test('should render Loading component when data is not ready', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data: undefined,
    loading: true,
    error: undefined,
    called: true,
  });

  const { getByText } = setup();

  expect(getByText('...')).toBeTruthy();
});

test('should render Error component when there is an error', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data: undefined,
    loading: false,
    error: new APOLLO.ApolloError({}),
    called: true,
  });

  const { getByText } = setup();

  expect(getByText('There was an error')).toBeTruthy();
});

test('should render Movie Genres list when data is ready', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    called: true,
  });

  const { getByText } = setup();

  expect(getByText('genreOne')).toBeTruthy();
  expect(getByText('genreTwo')).toBeTruthy();
});

test('should navigate to Movies By Genre screen when poster is clicked', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    called: true,
  });

  const { getByText } = setup();

  fireEvent.press(getByText('genreOne'));

  expect(useNavigation().navigate).toHaveBeenCalledWith('Movie By Genre', {
    id: 1,
    name: 'genreOne',
  });
});
