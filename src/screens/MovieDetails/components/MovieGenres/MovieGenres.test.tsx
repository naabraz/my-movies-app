import React from 'react';
import { render, act } from 'react-native-testing-library';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';

import { MOVIE_GENRES } from './MovieGenres.graphql';
import { MovieGenresList } from './MovieGenres';

describe('Given Movie Genres component', () => {
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

  it('Should render Loading component when data is not ready', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MovieGenresList id="1" />
      </MockedProvider>,
    );

    expect(getByTestId('Loading')).toBeTruthy();
  });

  it('Should render Error component when there is an error', async () => {
    const localMock = {
      request: {
        query: MOVIE_GENRES,
      },
      error: new Error('Default error'),
    };

    const { getByTestId } = render(
      <MockedProvider mocks={[localMock]} addTypename={false}>
        <MovieGenresList id="1" />
      </MockedProvider>,
    );

    await act(() => wait(0));

    expect(getByTestId('Error')).toBeTruthy();
  });

  it('Should render Movie Genres list when data is ready', async () => {
    const { getByText } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MovieGenresList id="1" />
      </MockedProvider>,
    );

    await act(() => wait(0));

    expect(getByText('genreOne')).toBeTruthy();
    expect(getByText('genreTwo')).toBeTruthy();
  });
});
