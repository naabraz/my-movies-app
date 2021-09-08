import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';

import { GenreButton, Loading, Error } from 'src/components';

import { GENRES } from './index.graphql';
import { GenreList as GenreListType, Genre } from './types';
import { Genres, List, Title, Button, Text } from './styles';

const GenreList: React.FC = () => {
  const { loading, data, error } = useQuery<GenreListType>(GENRES);

  const favoriteGenres: Genre[] = [];

  const onPress = (genre: Genre): void => {
    favoriteGenres.push(genre);
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
        <Button>
          <Text>Save</Text>
        </Button>
      </Genres>
    </ScrollView>
  );
};

export default GenreList;
