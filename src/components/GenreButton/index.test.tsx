import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import GenreButton from '.';

const defaultProps = {
  title: 'Action',
  onPress: jest.fn(),
  selectable: true,
};

test('should render component correctly', () => {
  const { getByText } = render(<GenreButton {...defaultProps} />);

  expect(getByText('Action')).toBeTruthy();
});

test('should execute onPress function', () => {
  const { getByText } = render(<GenreButton {...defaultProps} />);

  fireEvent.press(getByText('Action'));

  expect(defaultProps.onPress).toHaveBeenCalled();
});
