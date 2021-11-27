import { Movie } from 'src/components/MoviesList/types';

export type RootStackParamList = {
  Home: undefined;
  'Movie Details': Movie;
  'Movie By Genre': { id: string; name: string };
};

export type BottomTabParams = {
  'Popular Movies': undefined;
  'Genre List': undefined;
  'Favorite Genres': undefined;
};
