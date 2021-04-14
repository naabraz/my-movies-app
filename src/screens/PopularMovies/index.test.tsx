import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/react-testing';

import PopularMovies from './index';
import { POPULAR_MOVIES } from './index.graphql';

const mocks = {
  request: {
    query: POPULAR_MOVIES,
  },
  result: {
    data: {
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
    },
  },
};

test('should render Loading component when data is not ready', async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <PopularMovies />
    </MockedProvider>,
  );

  expect(getByTestId('LoadingAnimation')).toBeTruthy();
});

test('should render Error component when there is an error', async () => {
  const localMock = {
    request: {
      query: POPULAR_MOVIES,
    },
    error: new Error('Default error'),
  };

  const { getByTestId } = render(
    <MockedProvider mocks={[localMock]} addTypename={false}>
      <PopularMovies />
    </MockedProvider>,
  );

  await waitFor(() => expect(getByTestId('ErrorAnimation')).toBeTruthy());
});

test('should render Movies list when data is ready', async () => {
  const { getAllByLabelText } = render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <PopularMovies />
    </MockedProvider>,
  );

  const labelText = 'Go to movie details';

  await waitFor(() => expect(getAllByLabelText(labelText).length).toEqual(2));
});
