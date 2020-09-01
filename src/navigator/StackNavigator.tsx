import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import { PopularMovies, MovieDetails, MoviesByGenre } from 'screens';
import * as Styles from './StackNavigator.style.js';

type RootStackParamList = {
  'Popular Movies': undefined;
  'Movie Details': undefined;
  'Movie By Genre': { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Popular Movies"
    screenOptions={{ ...Styles.screenOptions, headerBackTitleVisible: false }}
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
