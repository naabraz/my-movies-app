import React from 'react';
import { Text, Box, Icon } from '@gympass/yoga';
import { StarFilled } from '@gympass/yoga-icons';

import { Rating as RatingTypes } from './types';

const Rating: React.FC<RatingTypes> = ({ voteAverage }) => {
  return (
    <Box flexDirection="row">
      <Icon as={StarFilled} width="small" height="small" fill="energy" />
      <Box flexDirection="row">
        <Text.Small color="clear">{voteAverage}</Text.Small>
        <Text.Small color="clear">/10</Text.Small>
      </Box>
    </Box>
  );
};

export default Rating;
