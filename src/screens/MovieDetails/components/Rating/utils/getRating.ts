import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { Rating as RatingTypes } from './getRating.types';

export const getRating = (voteAverage): RatingTypes[] => {
  const stars: RatingTypes[] = [];

  for (let i = 1; i <= 5; i++) {
    const uuid = uuidv4();
    let image = 'filledStar';

    if (i > Number(voteAverage) / 2) image = 'unfilledStar';

    stars.push({ image, uuid });
  }

  return stars;
};
