import React, { useState } from 'react';
import { ScrollView, NativeModules } from 'react-native';
import { useQuery } from '@apollo/client';
import { Text, Box, Button } from '@gympass/yoga';

import { Loading, Error } from 'src/components';

import { GENRES } from './index.graphql';
import { GenreList as GenreListType, Genre } from './types';

const GenreList: React.FC = () => {
  const { loading, data, error } = useQuery<GenreListType>(GENRES);
  const [favoriteGenres, setFavoriteGenres] = useState<Genre[]>([]);

  const { SecureStorage } = NativeModules;

  const saveFavoriteGenres: Function = () => {
    try {
      SecureStorage.setValue('FAVORITE_GENRES', JSON.stringify(favoriteGenres));
    } catch (e) {
      console.log('setFavoriteGenres error', e);
    }
  };

  const removeItem = (genre: Genre): void =>
    setFavoriteGenres((prevList: Genre[]) =>
      prevList.filter(prevGenreId => prevGenreId.id !== genre.id),
    );

  const onPress = (genre: Genre): void => {
    favoriteGenres.includes(genre)
      ? removeItem(genre)
      : setFavoriteGenres((prevState: Genre[]) => [...prevState, genre]);
  };

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <Box bg="stamina" p="medium">
      <Box as={ScrollView} showsVerticalScrollIndicator={false}>
        <Text.H5 color="energy">Select Your Favorite Genres</Text.H5>
        <Box pv="medium">
          {data?.genreList.map(genre => (
            <Box mb="small">
              <Button
                key={genre.id}
                selectable
                full
                onPress={(): void => onPress(genre)}
              >
                {genre.name}
              </Button>
            </Box>
          ))}
        </Box>
        <Button
          full
          onPress={saveFavoriteGenres}
          disabled={!favoriteGenres.length}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default GenreList;
