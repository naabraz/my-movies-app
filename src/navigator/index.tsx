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
  FavoriteGenre,
} from 'src/screens';
import { TabBar } from 'src/components';
import { RootStackParamList, BottomTabParams } from './types';
import { screenOptions } from './styles.js';

const BottomTab = createBottomTabNavigator<BottomTabParams>();
const PopularMoviesStack = createNativeStackNavigator<RootStackParamList>();

const PopularMoviesStackScreen: React.FC = () => (
  <PopularMoviesStack.Navigator screenOptions={{ ...screenOptions }}>
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
  <BottomTab.Navigator
    screenOptions={{ ...screenOptions }}
    tabBar={(props): Element => <TabBar state={props.state} />}
  >
    <BottomTab.Screen
      name="Popular Movies"
      component={PopularMoviesStackScreen}
      options={{ headerShown: false }}
    />
    <BottomTab.Screen name="Favorite Genre" component={FavoriteGenre} />
  </BottomTab.Navigator>
);

export default Tabs;
