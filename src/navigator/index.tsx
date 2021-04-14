import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { PopularMovies, MovieDetails, MoviesByGenre } from 'screens';
import { RootStackParamList } from './types';
import { screenOptions } from './styles.js';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Popular Movies"
    screenOptions={{ ...screenOptions, headerBackTitleVisible: false }}
  >
    <Stack.Screen name="Popular Movies" component={PopularMovies} />
    <Stack.Screen name="Movie Details" component={MovieDetails} />
    <Stack.Screen
      name="Movie By Genre"
      component={MoviesByGenre}
      options={({ route }): StackNavigationOptions => ({
        title: `${route.params.name} Movies`,
      })}
    />
  </Stack.Navigator>
);

export default StackNavigator;
