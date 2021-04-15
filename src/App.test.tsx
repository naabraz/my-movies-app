import React from 'react';
import { render } from '@testing-library/react-native';

import { App } from './App';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: jest
    .fn()
    .mockImplementation(() => 'NavigationContainer'),
}));

jest.mock('apollo', () => ({ apolloClient: jest.fn() }));
jest.mock('navigator', () => ({
  StackNavigator: jest.fn().mockImplementation(() => 'StackNavigator'),
}));

test('renders correctly', () => {
  render(<App />);
});
