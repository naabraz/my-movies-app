interface PopularMovies {
  id: number;
  title: string;
  posterPath: string;
}

export interface PopularMoviesData {
  popularMovies: PopularMovies[];
}
