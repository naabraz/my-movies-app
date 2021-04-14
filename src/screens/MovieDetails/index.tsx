import React from 'react';

import { Rating, MovieGenresList, SimilarMoviesList } from './components';
import {
  Container,
  Details,
  Title,
  Poster,
  Info,
  Date,
  Year,
  Overview,
} from './styles';
import { Details as DetailsType } from './types';

const MovieDetails: React.FC<DetailsType> = ({ route }: DetailsType) => {
  const {
    params: { movie },
  } = route;

  const { id, title, overview, backdropPath, releaseDate, voteAverage } = movie;
  const formattedYear = releaseDate.substr(0, releaseDate.indexOf('-'));

  return (
    <>
      <Container>
        <Details>
          <Title>{title}</Title>
          <Poster source={{ uri: backdropPath }} borderRadius={10} />
          <Info>
            <Rating voteAverage={voteAverage} />
            <Date>
              <Year>{formattedYear}</Year>
            </Date>
          </Info>
          <MovieGenresList id={id} />
          <Overview>{overview}</Overview>
        </Details>
        <SimilarMoviesList id={id} />
      </Container>
    </>
  );
};

export default MovieDetails;
