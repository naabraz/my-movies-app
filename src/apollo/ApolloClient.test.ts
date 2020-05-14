import ApolloClient from 'apollo-boost';

import { apolloClient } from './';

jest.mock('apollo-boost');

describe('Given Apollo Client module', () => {
  it('Should return Apollo instance client', () => {
    expect(apolloClient).toBeInstanceOf(ApolloClient);
  });
});
