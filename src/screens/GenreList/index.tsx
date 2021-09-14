import React, { useEffect, useState } from 'react';
import { ScrollView, NativeModules } from 'react-native';
import { useQuery } from '@apollo/client';

import { GenreButton, Loading, Error } from 'src/components';

import { GENRES } from './index.graphql';
import { GenreList as GenreListType, Genre } from './types';
import { Genres, List, Title, Button, Text } from './styles';

const GenreList: React.FC = () => {
  const { loading, data, error } = useQuery<GenreListType>(GENRES);
  const [list, setList] = useState<Genre[]>([]);
  const { SecureStorage } = NativeModules;

  const saveFavoriteGenres: unknown = async () => {
    try {
      await SecureStorage.setValue('FAVORITE_GENRES', JSON.stringify(list));
    } catch (e) {
      console.log('setFavoriteGenres error', e);
    }
  };

  useEffect(() => {
    const getFavoriteGenres: any = async () => {
      try {
        const favoriteGenres = await SecureStorage.getValue('FAVORITE_GENRES');

        console.log('favoriteGenres', favoriteGenres);
      } catch (e) {
        console.log('getFavoriteGenres error', e);
      }
    };

    getFavoriteGenres();
  }, [SecureStorage]);

  const removeItem = (genre: Genre): void =>
    setList((prevList: Genre[]) =>
      prevList.filter(item => item.id !== genre.id),
    );

  const onPress = (genre: Genre): void => {
    list.includes(genre)
      ? removeItem(genre)
      : setList((prevState: Genre[]) => [...prevState, genre]);
  };

  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Genres>
        <Title>Select Your Favorite Genres</Title>
        <List>
          {data?.genreList.map(genre => (
            <GenreButton
              key={genre.id}
              title={genre.name}
              selectable
              onPress={(): void => onPress(genre)}
            />
          ))}
        </List>
        <Button onPress={saveFavoriteGenres} disabled={!list.length}>
          <Text>Save</Text>
        </Button>
      </Genres>
    </ScrollView>
  );
};

export default GenreList;
