import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as APOLLO from '@apollo/client';

import GenreList from './';

const useQueryMock = jest.spyOn(APOLLO, 'useQuery');

test('should render Loading component when data is not ready', () => {
  useQueryMock.mockImplementation((): any => ({
    loading: true,
    error: false,
    data: null,
  }));

  const { getByTestId } = render(<GenreList />);

  expect(getByTestId('LoadingAnimation')).toBeTruthy();
});

test('should render Error component when there is an error', () => {
  useQueryMock.mockImplementation((): any => ({
    loading: false,
    error: true,
    data: null,
  }));

  const { getByTestId } = render(<GenreList />);

  expect(getByTestId('ErrorAnimation')).toBeTruthy();
});

test('should render genre list', () => {
  const data = {
    genreList: [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 16,
        name: 'Animation',
      },
    ],
  };

  useQueryMock.mockImplementation((): any => ({
    loading: false,
    error: false,
    data,
  }));

  const { getByText } = render(<GenreList />);
  const genre = getByText('Action');

  fireEvent.press(genre);

  expect(genre).toBeTruthy();
});
