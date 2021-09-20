import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  PopularMovies,
  MovieDetails,
  MoviesByGenre,
  GenreList,
  FavoriteGenres,
} from 'src/screens';
import { RootStackParamList } from './types';
import { screenOptions } from './styles.js';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const Home: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name="Popular Movies" component={PopularMovies} />
    <Tab.Screen name="Genre List" component={GenreList} />
    <Tab.Screen name="Favorite Genres" component={FavoriteGenres} />
  </Tab.Navigator>
);

const StackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Popular Movies"
    screenOptions={{ ...screenOptions, headerBackTitleVisible: false }}
  >
    <Stack.Screen name="Popular Movies" component={Home} />
    <Stack.Screen name="Movie Details" component={MovieDetails} />
    <Stack.Screen
      name="Movie By Genre"
      component={MoviesByGenre}
      options={({ route }): StackNavigationOptions => ({
        title: `${route.params.name} Movies`,
      })}
    />
    <Stack.Screen name="Genre List" component={GenreList} />
  </Stack.Navigator>
);

export default StackNavigator;
