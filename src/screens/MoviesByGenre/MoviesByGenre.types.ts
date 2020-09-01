export type Genre = {
  route: {
    params: {
      id: string;
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
