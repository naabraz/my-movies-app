import React from 'react';
import { render } from '@testing-library/react-native';

import { App } from './App';

jest.mock('apollo', () => jest.fn());
jest.mock('navigator', () => 'StackNavigator');

test('renders correctly', () => {
  render(<App />);
});
