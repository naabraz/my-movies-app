export type MovieDetails = {
  route: {
    params: {
      movie: {
        id: string;
        title: string;
        backdropPath: string;
        overview: string;
        releaseDate: string;
        voteAverage: Float32Array;
      };
    };
  };
};