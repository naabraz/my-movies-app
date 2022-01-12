import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery, ApolloError } from '@apollo/client';

import { render, RenderAPI } from 'src/utils/tests';

import SimilarMoviesList from './index';

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

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

const useQueryMock = useQuery as jest.MockedFunction<typeof Object>;

const setup = (): RenderAPI => render(<SimilarMoviesList id="1" />);

test('should render Similar Movies according with received id', () => {
  useQueryMock.mockReturnValue({ loading: true });

  const { getByText } = setup();

  expect(getByText('...')).toBeTruthy();
});

test('should render Error component when there is an error', () => {
  useQueryMock.mockReturnValue({ error: new ApolloError({}) });

  const { getByText } = setup();

  expect(getByText('There was an error')).toBeTruthy();
});

test('should render Similar Movies list when data is ready', () => {
  useQueryMock.mockReturnValue({ data });

  const { getAllByLabelText } = setup();

  const label = 'Go to movie details';

  expect(getAllByLabelText(label).length).toEqual(2);
});

test('should navigate to Movie Details when poster is clicked', () => {
  useQueryMock.mockReturnValue({ data });

  const { getAllByLabelText } = setup();

  const [label] = getAllByLabelText('Go to movie details');

  fireEvent.press(label);

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
