import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import * as APOLLO from '@apollo/client';

import { render, RenderAPI } from 'src/utils/tests';

import SimilarMoviesList from './index';

const useQueryMock = jest.spyOn(APOLLO, 'useQuery');

const data = {
  similarMovies: [
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

const setup = (): RenderAPI => render(<SimilarMoviesList id="1" />);

test('should render Similar Movies according with received id', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data: undefined,
    loading: true,
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

test('should render Similar Movies list when data is ready', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    error: undefined,
    called: true,
  });

  const { getAllByLabelText } = setup();

  const label = 'Go to movie details';

  expect(getAllByLabelText(label).length).toEqual(2);
});

test('should navigate to Movie Details when poster is clicked', () => {
  useQueryMock.mockReturnValue({
    ...queryResultMock,
    data,
    loading: false,
    error: undefined,
    called: true,
  });

  const { getAllByLabelText } = setup();

  const label = 'Go to movie details';

  fireEvent.press(getAllByLabelText(label)[0]);

  expect(useNavigation().navigate).toHaveBeenCalledWith('Movie Details', {
    movie: {
      backdropPath: 'fooBackdropPathOne',
      id: 1,
      overview: 'fooOverviewOne',
      posterPath: 'posterPathOne',
      releaseDate: '2020-02-02',
      title: 'movieTitleOne',
      voteAverage: 7,
    },
  });
});
