import ApolloClient from 'apollo-boost';

import apolloClient from './index';

jest.mock('apollo-boost');

test('return apollo instance client', () => {
  expect(apolloClient).toBeInstanceOf(ApolloClient);
});
