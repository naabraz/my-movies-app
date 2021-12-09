import React from 'react';
import { ScrollView, Image } from 'react-native';
import { Box, Text } from '@gympass/yoga';

import { Rating, MovieGenresList, SimilarMoviesList } from './components';
import { Details as DetailsType } from './types';

const MovieDetails: React.FC<DetailsType> = ({ route }: DetailsType) => {
  const {
    params: { movie },
  } = route;

  const { id, title, overview, backdropPath, releaseDate, voteAverage } = movie;
  const formattedYear = releaseDate.substr(0, releaseDate.indexOf('-'));

  return (
    <>
      <Box backgroundColor="stamina" as={ScrollView}>
        <Box ph="small" pv="small">
          <Text.H5 color="energy">{title}</Text.H5>
          <Box
            as={Image}
            source={{ uri: backdropPath }}
            borderRadius={10}
            mt="large"
            width="300"
            height="169"
            alignSelf="center"
          />
          <Box flexDirection="row" mt="small">
            <Rating voteAverage={voteAverage} />
            <Text.Small color="clear" ml="small">
              {formattedYear}
            </Text.Small>
          </Box>
          <MovieGenresList id={id} />
          <Text color="clear">{overview}</Text>
          <SimilarMoviesList id={id} />
        </Box>
      </Box>
    </>
  );
};

export default MovieDetails;
