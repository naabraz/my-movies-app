import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import MoviesList from './index';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

jest.mock('@react-navigation/native');

const movie = {
  id: 1,
  title: 'movieTitle',
  posterPath: 'fooPath',
  backdropPath: 'fooBackdropPath',
};

test('should navigate to Movie Details screen when poster is clicked', () => {
  const { getByText } = render(<MoviesList movie={movie} />);

  fireEvent.press(getByText('movieTitle'));

  expect(useNavigation().navigate).toHaveBeenCalledWith('Movie Details', {
    movie,
  });
});