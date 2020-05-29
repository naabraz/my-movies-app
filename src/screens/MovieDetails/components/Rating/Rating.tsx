import React from 'react';

import filledStar from 'assets/icons/star-filled.png';
import unfilledStar from 'assets/icons/star-unfilled.png';
import { Rating as RatingTypes } from './Rating.types';
import { getRating } from './utils';
import * as Styled from './Rating.style.js';

export const Rating: React.FC<RatingTypes> = ({ voteAverage }) => {
  const rating = getRating(voteAverage);
  const imageDictionary = { filledStar, unfilledStar };

  return (
    <Styled.Container>
      {rating.map(({ image, uuid }) => (
        <Styled.Rating source={imageDictionary[image]} key={uuid} />
      ))}
    </Styled.Container>
  );
};
