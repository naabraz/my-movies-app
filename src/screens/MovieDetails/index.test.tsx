import React from 'react';

import { render } from 'src/utils/tests';

import MovieDetails from './index';

jest.mock('./components', () => ({
  MovieGenresList: 'MovieGenresList',
  SimilarMoviesList: 'SimilarMoviesList',
  Rating: 'Rating',
}));

const movie = {
  id: '1',
  title: 'fooTitle',
  overview: 'fooOverview',
  backdropPath: 'fooBackDrop',
  releaseDate: '2000-00-00',
  voteAverage: 6.6,
};
const details = { params: { movie } };

test('should render received Movie Details', () => {
  const { getByText } = render(<MovieDetails route={details} />);

  expect(getByText('fooTitle')).toBeTruthy();
  expect(getByText('fooOverview')).toBeTruthy();
  expect(getByText('2000')).toBeTruthy();
});
