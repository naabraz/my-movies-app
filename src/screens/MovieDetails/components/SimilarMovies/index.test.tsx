import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { useNavigation } from '@react-navigation/native';

import { SIMILAR_MOVIES } from './index.graphql';
import SimilarMoviesList from './index';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

const mocks = {
  request: {
    query: SIMILAR_MOVIES,
    variables: {
      movieId: '1',
    },
  },
  result: {
    data: {
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
    },
  },
};

test('should render Similar Movies according with received id', () => {
  const { getByText } = render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <SimilarMoviesList id="1" />
    </MockedProvider>,
  );

  expect(getByText('...')).toBeTruthy();
});

test('should render Error component when there is an error', async () => {
  const localMock = {
    request: {
      query: SIMILAR_MOVIES,
    },
    error: new Error('Default error'),
  };

  const { getByText } = render(
    <MockedProvider mocks={[localMock]} addTypename={false}>
      <SimilarMoviesList id="1" />
    </MockedProvider>,
  );

  await waitFor(() => expect(getByText('There was an error')).toBeTruthy());
});

test('should render Similar Movies list when data is ready', async () => {
  const { getAllByLabelText } = render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <SimilarMoviesList id="1" />
    </MockedProvider>,
  );

  const label = 'Go to movie details';

  await waitFor(() => expect(getAllByLabelText(label).length).toEqual(2));
});

test('should navigate to Movie Details when poster is clicked', async () => {
  const { getAllByLabelText } = render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <SimilarMoviesList id="1" />
    </MockedProvider>,
  );

  const label = 'Go to movie details';

  await waitFor(() => fireEvent.press(getAllByLabelText(label)[0]));

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
