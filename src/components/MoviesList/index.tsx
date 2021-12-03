import React from 'react';
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { TouchableWithoutFeedback, Image } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, Text } from '@gympass/yoga';

import { firebase } from 'src/services';
import { RootStackParamList, BottomTabParams } from 'src/navigator/types';

import { Movie } from './types';

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
        <Box
          as={Image}
          source={{ uri: backdropPath }}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          borderBottomLeftRadius={10}
          borderBottomRightRadius={10}
          width={300}
          height={169}
        />
        <Box
          width="100%"
          position="absolute"
          bottom="0"
          alignItems="center"
          backgroundColor="stamina"
          opacity={0.8}
          ph="small"
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
