import React, { useState } from 'react';
import { NativeModules, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Genre } from 'src/screens/GenreList/types';

import { Genres, Name } from './styles';

const FavoriteGenres: React.FC = () => {
  const [favoriteGenres, setFavoriteGenres] = useState<Genre[]>([]);
  const { SecureStorage } = NativeModules;

  useFocusEffect(() => {
    const getFavoriteGenres = async (): Promise<void> => {
      const genres = await SecureStorage.getValue('FAVORITE_GENRES');

      setFavoriteGenres(JSON.parse(genres));
    };

    getFavoriteGenres();
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Genres>
        {favoriteGenres.map(genre => (
          <Name key={genre.id}>{genre.name}</Name>
        ))}
      </Genres>
    </ScrollView>
  );
};

export default FavoriteGenres;
