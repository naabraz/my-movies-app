import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PopularMovies, MovieDetails, MoviesByGenre } from 'screens';
import * as Styles from './StackNavigator.style.js';

const Stack = createStackNavigator();

export const StackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Popular Movies"
    screenOptions={Styles.screenOptions}
  >
    <Stack.Screen name="Popular Movies" component={PopularMovies} />
    <Stack.Screen name="Movie Details" component={MovieDetails} />
    <Stack.Screen name="Movie By Genre" component={MoviesByGenre} />
  </Stack.Navigator>
);
