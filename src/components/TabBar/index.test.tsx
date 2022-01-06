import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

import TabBar from './index';

const tabBarProps = {
  state: {
    routes: [
      {
        name: 'Popular Movies',
      },
      {
        name: 'Favorite Genre',
      },
    ],
    index: 0,
  },
};

test('should render tab bar with routes', () => {
  const { getByText } = render(<TabBar {...tabBarProps} />);

  expect(getByText('Popular Movies')).toBeTruthy();
  expect(getByText('Favorite Genre')).toBeTruthy();
});

test('should navigate to route item is pressed', () => {
  const { getByText } = render(<TabBar {...tabBarProps} />);

  fireEvent.press(getByText('Popular Movies'));

  expect(useNavigation().navigate).toHaveBeenCalledWith({
    name: 'Popular Movies',
  });
});
