import React from 'react';

import * as Styled from './Screen.style';
import { MovieDetails } from './Screen.types';
import { Rating } from '../components';
import Calendar from 'assets/icons/calendar.svg';

export const MovieDetailsScreen: React.FC<MovieDetails> = ({
  route,
}: MovieDetails) => {
  const {
    params: { movie },
  } = route;

  const { title, overview, backdropPath, releaseDate, voteAverage } = movie;

  return (
    <>
      <Styled.Container>
        <Styled.Image source={{ uri: backdropPath }} borderRadius={10} />
        <Styled.Details>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Info>
            <Calendar width={20} height={20} />
            <Styled.Date>{releaseDate}</Styled.Date>
            <Rating voteAverage={voteAverage} />
          </Styled.Info>
          <Styled.Overview>{overview}</Styled.Overview>
        </Styled.Details>
      </Styled.Container>
    </>
  );
};
