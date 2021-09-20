import React, { useState } from 'react';
import { ScrollView, NativeModules } from 'react-native';
import { useQuery } from '@apollo/client';

import { GenreButton, Loading, Error } from 'src/components';

import { GENRES } from './index.graphql';
import { GenreList as GenreListType, Genre } from './types';
import { Genres, List, Title, Button, Text } from './styles';

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
        <Button onPress={saveFavoriteGenres} disabled={!favoriteGenres.length}>
          <Text>Save</Text>
        </Button>
      </Genres>
    </ScrollView>
  );
};

export default GenreList;
