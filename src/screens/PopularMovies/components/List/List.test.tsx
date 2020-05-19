import React from 'react';
import { render } from 'react-native-testing-library';

import { PopularMoviesList } from './';

describe('Given PopularMoviesList component', () => {
  it('Should render component correctly', () => {
    const movie = { id: 1, title: 'movieTitle', posterPath: 'fooPath' };
    const { getAllByTestId } = render(<PopularMoviesList movie={movie} />);

    expect(getAllByTestId('MoviePoster')).toBeTruthy();
  });
});
