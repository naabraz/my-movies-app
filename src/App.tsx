import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './apollo/ApolloClient';
import { StackNavigator } from './navigator';

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <StackNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
};

export default App;
