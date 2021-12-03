import React from 'react';
import { render } from '@testing-library/react-native';
import * as APOLLO from '@apollo/client';
import { ThemeProvider } from '@gympass/yoga';

import PopularMovies from './index';

const useQueryMock = jest.spyOn(APOLLO, 'useQuery');

const data = {
  popularMovies: [
    {
      id: 1,
      title: 'movieTitleOne',
      posterPath: 'posterPathOne',
      backdropPath: 'fooBackdropPathOne',
      voteAverage: 7,
      overview: 'fooOverviewOne',
      releaseDate: '2020-02-02',
    },
    {
      id: 2,
      title: 'movieTitleTwo',
      posterPath: 'posterPathTwo',
      backdropPath: 'fooBackdropPathTwo',
      voteAverage: 8.1,
      overview: 'fooOverviewTwo',
      releaseDate: '2019-02-02',
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

test('should render Loading component when data is not ready', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data: undefined,
    loading: true,
    called: true,
  });

  const { getByTestId } = render(
    <ThemeProvider>
      <PopularMovies />
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
      <PopularMovies />
    </ThemeProvider>,
  );

  expect(getByTestId('ErrorAnimation')).toBeTruthy();
});

test('should render Movies list when data is ready', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    called: true,
  });

  const { getAllByLabelText } = render(
    <ThemeProvider>
      <PopularMovies />
    </ThemeProvider>,
  );

  const labelText = 'Go to movie details';

  expect(getAllByLabelText(labelText).length).toEqual(2);
});
