import React from 'react';

import * as Styled from './Screen.style';
import { MovieDetails } from './Screen.types';

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
          <Styled.Text>Release Date: {releaseDate}</Styled.Text>
          <Styled.Text>Rating: {voteAverage}</Styled.Text>
          <Styled.Text>{overview}</Styled.Text>
        </Styled.Details>
      </Styled.Container>
    </>
  );
};
