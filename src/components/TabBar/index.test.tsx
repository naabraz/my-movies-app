import React from 'react';
import { fireEvent, RenderAPI } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

import { render } from 'src/utils/tests';

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

const setup = (): RenderAPI => render(<TabBar {...tabBarProps} />);

test('should render tab bar with routes', () => {
  const { getByText } = setup();

  expect(getByText('Popular Movies')).toBeTruthy();
  expect(getByText('Favorite Genre')).toBeTruthy();
});

test('should navigate to route item is pressed', () => {
  const { getByText } = setup();

  fireEvent.press(getByText('Popular Movies'));

  expect(useNavigation().navigate).toHaveBeenCalledWith({
    name: 'Popular Movies',
  });
});
