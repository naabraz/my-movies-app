export type Genre = {
  route: {
    params: {
      id: number;
    };
  };
};

export type Movies = {
  moviesByGenre: {
    id: number;
    title: string;
    posterPath: string;
    backdropPath: string;
  }[];
};
