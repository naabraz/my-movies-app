import React from 'react';

import { Rating as RatingTypes } from './Rating.types';
import * as Styled from './Rating.style.js';

export const Rating: React.FC<RatingTypes> = ({ voteAverage }) => {
  return (
    <Styled.Rating>
      <Styled.RatingStar source={require('assets/icons/star-filled.png')} />
      <Styled.RatingInfo>
        <Styled.VoteAverage>{voteAverage}</Styled.VoteAverage>
        <Styled.RatingLimit>/10</Styled.RatingLimit>
      </Styled.RatingInfo>
    </Styled.Rating>
  );
};
