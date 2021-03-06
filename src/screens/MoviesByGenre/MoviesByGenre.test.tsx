import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/react-testing';

import { MoviesByGenre } from './MoviesByGenre';
import { MOVIES_BY_GENRE } from './MoviesByGenre.graphql';

describe('Given MoviesByGenre component', () => {
  const mocks = {
    request: {
      query: MOVIES_BY_GENRE,
      variables: {
        genreId: 2,
      },
    },
    result: {
      data: {
        moviesByGenre: [
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

  const genre = { params: { id: 2 } };

  it('Should render Loading component when data is not ready', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MoviesByGenre route={genre} />
      </MockedProvider>,
    );

    expect(getByTestId('LoadingAnimation')).toBeTruthy();
  });

  it('Should render Error component when there is an error', async () => {
    const localMock = {
      request: {
        query: MOVIES_BY_GENRE,
      },
      error: new Error('Default error'),
    };

    const { getByTestId } = render(
      <MockedProvider mocks={[localMock]} addTypename={false}>
        <MoviesByGenre route={genre} />
      </MockedProvider>,
    );

    await waitFor(() => expect(getByTestId('ErrorAnimation')).toBeTruthy());
  });

  it('Should render Movies list when data is ready', async () => {
    const { getAllByLabelText } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <MoviesByGenre route={genre} />
      </MockedProvider>,
    );

    const labelText = 'Go to movie details';

    await waitFor(() => expect(getAllByLabelText(labelText).length).toEqual(2));
  });
});
