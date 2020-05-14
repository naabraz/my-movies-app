import React from 'react';
import renderer from 'react-test-renderer';

import { App } from './App';

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: jest
    .fn()
    .mockImplementation(() => 'NavigationContainer'),
}));

jest.mock('apollo', () => ({ apolloClient: jest.fn() }));
jest.mock('./navigator', () => ({
  StackNavigator: jest.fn().mockImplementation(() => 'StackNavigator'),
}));

it('renders correctly', () => {
  renderer.create(<App />);
});
