import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PopularMoviesContainer } from '../screens/';
import * as Styles from './StackNavigator.style.js';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Popular Movies"
    screenOptions={Styles.screenOptions}
  >
    <Stack.Screen name="Popular Movies" component={PopularMoviesContainer} />
  </Stack.Navigator>
);

export default StackNavigator;
