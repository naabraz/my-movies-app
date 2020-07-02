import React from 'react';

import { Rating, MovieGenresList } from '../components';
import * as Styled from './Screen.style';
import { MovieDetails } from './Screen.types';

export const MovieDetailsScreen: React.FC<MovieDetails> = ({
  route,
}: MovieDetails) => {
  const {
    params: { movie },
  } = route;

  const { id, title, overview, backdropPath, releaseDate, voteAverage } = movie;

  return (
    <>
      <Styled.Container>
        <Styled.Details>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Poster source={{ uri: backdropPath }} borderRadius={10} />
          <Styled.Info>
            <Rating voteAverage={voteAverage} />
            <Styled.Date>
              <Styled.Year>
                {releaseDate.substr(0, releaseDate.indexOf('-'))}
              </Styled.Year>
            </Styled.Date>
          </Styled.Info>
          <MovieGenresList id={id} />
          <Styled.Overview>{overview}</Styled.Overview>
        </Styled.Details>
      </Styled.Container>
    </>
  );
};
