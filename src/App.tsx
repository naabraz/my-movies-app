import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client/react';

import apolloClient from 'src/apollo';
import StackNavigator from 'src/navigator';

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
