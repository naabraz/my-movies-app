import React, { useState } from 'react';
import { ScrollView, NativeModules } from 'react-native';
import { useQuery } from '@apollo/client';
import { Text, List, Checkbox, Box } from '@gympass/yoga';

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

  // const removeItem = (genre: Genre): void =>
  //   setFavoriteGenres((prevList: Genre[]) =>
  //     prevList.filter(prevGenreId => prevGenreId.id !== genre.id),
  //   );

  // const onPress = (genre: Genre): void => {
  //   favoriteGenres.includes(genre)
  //     ? removeItem(genre)
  //     : setFavoriteGenres((prevState: Genre[]) => [...prevState, genre]);
  // };

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <Box bg="stamina" p="medium">
      <Box as={ScrollView} showsVerticalScrollIndicator={false}>
        <Box pv="medium">
          {data?.genreList.map((genre, index) => {
            const notTheLastOne = index !== data.genreList.length - 1;

            return (
              <List.Item
                flexDirection="row"
                justifyContent="space-between"
                divided={notTheLastOne}
                key={genre.id}
              >
                <Text color="energy">{genre.name}</Text>
                <Checkbox.Switch
                  id={genre.id}
                  checked={true}
                  onChange={(): void => console.log()}
                />
              </List.Item>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default GenreList;
