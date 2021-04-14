import React from 'react';
import { render } from '@testing-library/react-native';

import Rating from './index';

test('should render vote average received', () => {
  const { getByText } = render(<Rating voteAverage={1.1} />);

  expect(getByText('1.1')).toBeTruthy();
});
