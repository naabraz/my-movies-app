import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from 'react-apollo';

import { apolloClient } from 'apollo';
import { StackNavigator } from 'navigator';

export const App: React.FC = () => (
  <>
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <StackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  </>
);
