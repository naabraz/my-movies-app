import React from 'react';
import { render } from 'react-native-testing-library';

import { PopularMoviesScreen } from './Screen';

describe('Given Popular Movies Screen component', () => {
  it('Should render list of movies', () => {
    const movies = [
      {
        id: 1,
        title: 'movieTitleOne',
        posterPath: 'posterPathOne',
      },
      {
        id: 2,
        title: 'movieTitleTwo',
        posterPath: 'posterPathTwo',
      },
    ];

    const { queryAllByTestId } = render(
      <PopularMoviesScreen movies={movies} />,
    );

    expect(queryAllByTestId('MoviePoster')?.length).toEqual(2);
  });
});
