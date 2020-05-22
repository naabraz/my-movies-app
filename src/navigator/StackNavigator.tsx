import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PopularMoviesContainer, MovieDetailsScreen } from 'screens';
import * as Styles from './StackNavigator.style.js';

const Stack = createStackNavigator();

export const StackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Popular Movies"
    screenOptions={Styles.screenOptions}
  >
    <Stack.Screen name="Popular Movies" component={PopularMoviesContainer} />
    <Stack.Screen name="Movie Details" component={MovieDetailsScreen} />
  </Stack.Navigator>
);
