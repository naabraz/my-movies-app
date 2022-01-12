import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery, ApolloError } from '@apollo/client';

import { render, RenderAPI } from 'src/utils/tests';

import MovieGenresList from './index';

const data = {
  movieGenres: [
    {
      id: 1,
      name: 'genreOne',
    },
    {
      id: 2,
      name: 'genreTwo',
    },
  ],
};

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

const useQueryMock = useQuery as jest.MockedFunction<typeof Object>;

const setup = (): RenderAPI => render(<MovieGenresList id="1" />);

test('should render Loading component when data is not ready', () => {
  useQueryMock.mockReturnValue({ loading: true });

  const { getByText } = setup();

  expect(getByText('...')).toBeTruthy();
});

test('should render Error component when there is an error', () => {
  useQueryMock.mockReturnValue({ error: new ApolloError({}) });

  const { getByText } = setup();

  expect(getByText('There was an error')).toBeTruthy();
});

test('should render Movie Genres list when data is ready', () => {
  useQueryMock.mockReturnValue({ data });

  const { getByText } = setup();

  expect(getByText('genreOne')).toBeTruthy();
  expect(getByText('genreTwo')).toBeTruthy();
});

test('should navigate to Movies By Genre screen when poster is clicked', () => {
  useQueryMock.mockReturnValue({ data });

  const { getByText } = setup();

  fireEvent.press(getByText('genreOne'));

  expect(useNavigation().navigate).toHaveBeenCalledWith('Movie By Genre', {
    id: 1,
    name: 'genreOne',
  });
});
