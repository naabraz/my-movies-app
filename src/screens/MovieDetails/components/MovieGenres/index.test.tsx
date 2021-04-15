import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { useNavigation } from '@react-navigation/native';

import { MOVIE_GENRES } from './index.graphql';
import MovieGenresList from './index';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

const mocks = {
  request: {
    query: MOVIE_GENRES,
    variables: {
      movieId: '1',
    },
  },
  result: {
    data: {
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
    },
  },
};

test('should render Loading component when data is not ready', () => {
  const { getByText } = render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <MovieGenresList id="1" />
    </MockedProvider>,
  );

  expect(getByText('...')).toBeTruthy();
});

test('should render Error component when there is an error', async () => {
  const localMock = {
    request: {
      query: MOVIE_GENRES,
    },
    error: new Error('Default error'),
  };

  const { getByText } = render(
    <MockedProvider mocks={[localMock]} addTypename={false}>
      <MovieGenresList id="1" />
    </MockedProvider>,
  );

  await waitFor(() => expect(getByText('There was an error')).toBeTruthy());
});

test('should render Movie Genres list when data is ready', async () => {
  const { getByText } = render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <MovieGenresList id="1" />
    </MockedProvider>,
  );

  await waitFor(() => expect(getByText('genreOne')).toBeTruthy());

  expect(getByText('genreTwo')).toBeTruthy();
});

test('should navigate to Movies By Genre screen when poster is clicked', async () => {
  const { getByText } = render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <MovieGenresList id="1" />
    </MockedProvider>,
  );

  await waitFor(() => fireEvent.press(getByText('genreOne')));

  expect(useNavigation().navigate).toHaveBeenCalledWith('Movie By Genre', {
    id: 1,
    name: 'genreOne',
  });
});
