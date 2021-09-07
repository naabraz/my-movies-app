import React from 'react';

import { Button, Title } from './styles';

const GenreButton: React.FC<{ title: string; onPress: Function }> = ({
  title,
  onPress,
}) => {
  return (
    <Button onPress={onPress}>
      <Title>{title}</Title>
    </Button>
  );
};

export default GenreButton;
