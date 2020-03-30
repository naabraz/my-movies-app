import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PopularMoviesContainer } from '../screens/';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Details">
    <Stack.Screen name="Popular Movies" component={PopularMoviesContainer} />
  </Stack.Navigator>
);

export default StackNavigator;
