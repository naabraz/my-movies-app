import React from 'react';
import { NativeModules } from 'react-native';
import { fireEvent, waitFor, RenderAPI } from '@testing-library/react-native';
import { useQuery, ApolloError } from '@apollo/client';

import { render } from 'src/utils/tests';

import FavoriteGenre from '.';

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

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

const useQueryMock = useQuery as jest.MockedFunction<typeof Object>;

const setup = (): RenderAPI => render(<FavoriteGenre />);

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

test('should render genre list', () => {
  useQueryMock.mockReturnValue({ data });

  const { getByText } = setup();

  const genre = getByText('Action');

  expect(genre).toBeTruthy();
});

test('should render selected favorite genre when it exists', async () => {
  useQueryMock.mockReturnValue({ data });

  setup();

  const { SecureStorage } = NativeModules;

  SecureStorage.getValue.mockReturnValueOnce(
    JSON.stringify({ id: 28, name: 'Action' }),
  );

  await waitFor(() =>
    expect(SecureStorage.getValue).toHaveBeenCalledWith('FAVORITE_GENRES'),
  );
});

test('should call secure storage save value method', async () => {
  useQueryMock.mockReturnValue({ data });

  const { getAllByA11yRole } = setup();

  const [movieGenre] = getAllByA11yRole('switch');

  fireEvent(movieGenre, 'onChange', true);

  const { SecureStorage } = NativeModules;

  await waitFor(() =>
    expect(SecureStorage.setValue).toHaveBeenCalledWith(
      'FAVORITE_GENRES',
      JSON.stringify({ id: 28, name: 'Action' }),
    ),
  );
});
