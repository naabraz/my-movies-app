import { Movie } from 'src/components/MoviesList/types';

export type RootStackParamList = {
  Home: undefined;
  'Movie Details': Movie;
  'Movie By Genre': { id: string; name: string };
};

export type BottomTabParams = {
  'Popular Movies': undefined;
  'Favorite Genre': undefined;
};
