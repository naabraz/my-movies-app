import React from 'react';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, Text } from '@gympass/yoga';

import { firebase } from 'src/services';
import { RootStackParamList, BottomTabParams } from 'src/navigator/types';

import { Movie } from './types';
import { Poster } from './styles';

type PopularMoviesProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Home'>,
  BottomTabNavigationProp<BottomTabParams, 'Popular Movies'>
>;

const MoviesList: React.FC<Movie> = ({ movie }: Movie) => {
  const { navigate } = useNavigation<PopularMoviesProp>();
  const { backdropPath, title } = movie;

  const goToDetailsScreen = (): void => {
    firebase.sendEvent('go_to_movie_details', {
      id: movie.id,
      movieTitle: movie.title,
    });

    navigate('Movie Details', { movie });
  };

  return (
    <TouchableWithoutFeedback
      onPress={goToDetailsScreen}
      accessibilityLabel="Go to movie details"
      accessibilityHint="Goes to movie details screen"
    >
      <Box mv="xsmall" alignItems="center">
        <Poster source={{ uri: backdropPath }} />
        <Box
          width="100%"
          position="absolute"
          bottom="0"
          alignItems="center"
          backgroundColor="stamina"
          opacity={0.8}
          paddingHorizontal="small"
        >
          <Text.SectionTitle
            numberOfLines={1}
            paddingVertical="xxsmall"
            color="energy"
          >
            {title}
          </Text.SectionTitle>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default MoviesList;
