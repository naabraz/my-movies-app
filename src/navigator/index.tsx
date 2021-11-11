import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import {
  PopularMovies,
  MovieDetails,
  MoviesByGenre,
  GenreList,
  FavoriteGenres,
} from 'src/screens';
import { RootStackParamList } from './types';
import { screenOptions } from './styles.js';

const TabStack = createBottomTabNavigator<RootStackParamList>();
const PopularMoviesStack = createNativeStackNavigator<RootStackParamList>();

const PopularMoviesStackScreen: React.FC = () => (
  <PopularMoviesStack.Navigator>
    <PopularMoviesStack.Screen
      name="Home"
      component={PopularMovies}
      options={{ title: 'Popular Movies' }}
    />
    <PopularMoviesStack.Screen name="Movie Details" component={MovieDetails} />
    <PopularMoviesStack.Screen
      name="Movie By Genre"
      component={MoviesByGenre}
      options={({ route }): NativeStackNavigationOptions => ({
        title: `${route.params.name} Movies`,
      })}
    />
  </PopularMoviesStack.Navigator>
);

const Tabs: React.FC = () => (
  <TabStack.Navigator screenOptions={{ ...screenOptions }}>
    <TabStack.Screen
      name="Popular Movies"
      component={PopularMoviesStackScreen}
      options={{ headerShown: false }}
    />
    <TabStack.Screen name="Genre List" component={GenreList} />
    <TabStack.Screen name="Favorite Genres" component={FavoriteGenres} />
  </TabStack.Navigator>
);

export default Tabs;
