import React, { useState } from 'react';

import { Button, Title } from './styles';

const GenreButton: React.FC<{
  title: string;
  onPress: Function;
  selectable: boolean;
}> = ({ title, onPress, selectable }) => {
  const [selected, setSelected] = useState(false);

  const onButtonPress = (): void => {
    if (selectable) setSelected(prevSelected => !prevSelected);

    onPress();
  };

  return (
    <Button selected={selected} onPress={onButtonPress}>
      <Title>{title}</Title>
    </Button>
  );
};

export default GenreButton;
