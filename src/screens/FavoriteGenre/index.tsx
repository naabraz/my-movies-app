import React, { useState, useEffect } from 'react';
import { ScrollView, NativeModules } from 'react-native';
import { useQuery } from '@apollo/client';
import { Text, List, Checkbox, Box } from '@gympass/yoga';

import { Loading, Error } from 'src/components';

import { GENRES } from './index.graphql';
import { GenreList as GenreListType, Genre } from './types';

const GenreList: React.FC = () => {
  const { loading, data, error } = useQuery<GenreListType>(GENRES);
  const [favorite, setFavorite] = useState<Genre>();
  const storageKey = 'FAVORITE_GENRES';

  const getFavorite: Function = async () => {
    const {
      SecureStorage: { getValue },
    } = NativeModules;

    try {
      const storageValue = await getValue(storageKey);

      if (storageValue) {
        const savedFavorite = JSON.parse(storageValue);
        setFavorite({ id: savedFavorite.id, name: savedFavorite.name });
      }
    } catch (e) {
      console.log('setFavoriteGenres error', e);
    }
  };

  useEffect(() => {
    getFavorite();
  }, []);

  const saveFavorite: Function = () => {
    const {
      SecureStorage: { setValue },
    } = NativeModules;

    try {
      setValue(storageKey, JSON.stringify(favorite));
    } catch (e) {
      console.log('setFavoriteGenres error', e);
    }
  };

  const onChange = (genre: Genre): void => {
    setFavorite(genre);
    saveFavorite();
  };

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
                  checked={genre.id === favorite?.id}
                  onChange={(): void => onChange(genre)}
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
