import React from 'react';

import { render } from 'src/utils/tests';

import { App } from './App';

jest.mock('@apollo/client/react', () => ({ ApolloProvider: 'ApolloProvider' }));
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: 'NavigationContainer',
}));
jest.mock('src/navigator', () => 'StackNavigator');

test('renders correctly', () => {
  render(<App />);
});
