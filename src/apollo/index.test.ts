import { ApolloClient } from '@apollo/client';

import apolloClient from './index';

test('return apollo instance client', () => {
  expect(apolloClient).toBeInstanceOf(ApolloClient);
});
