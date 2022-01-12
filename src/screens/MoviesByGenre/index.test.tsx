import React from 'react';
import { useQuery, ApolloError } from '@apollo/client';

import { render, RenderAPI } from 'src/utils/tests';

import MoviesByGenre from './index';

const data = {
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
};

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

const useQueryMock = useQuery as jest.MockedFunction<typeof Object>;

const genre = { params: { id: 2 } };

const setup = (): RenderAPI => render(<MoviesByGenre route={genre} />);

test('should render Loading component when data is not ready', () => {
  useQueryMock.mockReturnValue({ loading: true });

  const { getByTestId } = setup();

  expect(getByTestId('LoadingAnimation')).toBeTruthy();
});

test('should render Error component when there is an error', () => {
  useQueryMock.mockReturnValue({ error: new ApolloError({}) });

  const { getByTestId } = setup();

  expect(getByTestId('ErrorAnimation')).toBeTruthy();
});

test('should render Movies list when data is ready', () => {
  useQueryMock.mockReturnValue({ data });

  const { getAllByLabelText } = setup();

  const labelText = 'Go to movie details';

  expect(getAllByLabelText(labelText).length).toEqual(2);
});
