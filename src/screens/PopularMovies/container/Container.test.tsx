import React from 'react';
import { render } from 'react-native-testing-library';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';

import { PopularMoviesContainer } from './Container';
import { POPULAR_MOVIES } from '../PopularMovies.graphql';

describe('Given PopularMovies Container component', () => {
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
          },
          {
            id: 2,
            title: 'movieTitleTwo',
            posterPath: 'posterPathTwo',
            backdropPath: 'fooBackdropPathTwo',
          },
        ],
      },
    },
  };

  it('Should render Loading component when data is not ready', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <PopularMoviesContainer />
      </MockedProvider>,
    );

    expect(getByTestId('LoadingAnimation')).toBeTruthy();
  });

  it('Should render Error component when there is an error', async () => {
    const localMock = {
      request: {
        query: POPULAR_MOVIES,
      },
      error: new Error('Default error'),
    };

    const { getByTestId } = render(
      <MockedProvider mocks={[localMock]} addTypename={false}>
        <PopularMoviesContainer />
      </MockedProvider>,
    );

    await wait(0);

    expect(getByTestId('ErrorAnimation')).toBeTruthy();
  });

  it('Should render Movies list when data is ready', async () => {
    const { queryAllByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <PopularMoviesContainer />
      </MockedProvider>,
    );

    await wait(0);

    expect(queryAllByTestId('MoviePoster')?.length).toEqual(2);
  });
});
