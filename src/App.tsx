import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client/react';
import { ThemeProvider } from '@gympass/yoga';

import apolloClient from 'src/apollo';
import StackNavigator from 'src/navigator';

export const App: React.FC = () => (
  <>
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <StackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  </>
);
