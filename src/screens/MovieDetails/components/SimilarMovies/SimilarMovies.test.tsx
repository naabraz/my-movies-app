import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import { useNavigation } from '@react-navigation/native';

import { SIMILAR_MOVIES } from './SimilarMovies.graphql';
import { SimilarMoviesList } from './SimilarMovies';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

describe('Given Similar Movies component', () => {
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

  it('Should render Similar Movies according with received id', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <SimilarMoviesList id="1" />
      </MockedProvider>,
    );

    expect(getByTestId('Loading')).toBeTruthy();
  });

  it('Should render Error component when there is an error', async () => {
    const localMock = {
      request: {
        query: SIMILAR_MOVIES,
      },
      error: new Error('Default error'),
    };

    const { getByTestId } = render(
      <MockedProvider mocks={[localMock]} addTypename={false}>
        <SimilarMoviesList id="1" />
      </MockedProvider>,
    );

    await act(() => wait(0));

    expect(getByTestId('Error')).toBeTruthy();
  });

  it('Should render Similar Movies list when data is ready', async () => {
    const { queryAllByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <SimilarMoviesList id="1" />
      </MockedProvider>,
    );

    await act(() => wait(0));

    expect(queryAllByTestId('Button')?.length).toEqual(2);
  });

  it('Should navigate to Movie Details when poster is clicked', async () => {
    const { getAllByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <SimilarMoviesList id="1" />
      </MockedProvider>,
    );

    await act(() => wait(0));

    fireEvent.press(getAllByTestId('Button')[0]);

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
});
