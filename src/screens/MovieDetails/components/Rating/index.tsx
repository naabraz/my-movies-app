import React from 'react';

import { Rating as RatingTypes } from './types';
import {
  Container,
  RatingStar,
  RatingInfo,
  VoteAverage,
  RatingLimit,
} from './styles.js';

const Rating: React.FC<RatingTypes> = ({ voteAverage }) => {
  return (
    <Container>
      <RatingStar source={require('assets/icons/star-filled.png')} />
      <RatingInfo>
        <VoteAverage>{voteAverage}</VoteAverage>
        <RatingLimit>/10</RatingLimit>
      </RatingInfo>
    </Container>
  );
};

export default Rating;
