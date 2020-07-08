import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import { useNavigation } from '@react-navigation/native';

import { PopularMoviesList } from './';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

describe('Given PopularMoviesList component', () => {
  const movie = {
    id: 1,
    title: 'movieTitle',
    posterPath: 'fooPath',
    backdropPath: 'fooBackdropPath',
  };

  it('Should render component correctly', () => {
    const { getAllByTestId } = render(<PopularMoviesList movie={movie} />);

    expect(getAllByTestId('MoviePoster')).toBeTruthy();
  });

  it('Should navigate to Movie Details screen when poster is clicked', () => {
    const { getByTestId } = render(<PopularMoviesList movie={movie} />);

    fireEvent.press(getByTestId('Button'));

    expect(useNavigation().navigate).toHaveBeenCalledWith('Movie Details', {
      movie,
    });
  });
});
