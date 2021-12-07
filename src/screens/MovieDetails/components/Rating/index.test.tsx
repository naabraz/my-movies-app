import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@gympass/yoga';

import Rating from './index';

test('should render vote average received', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Rating voteAverage={1.1} />
    </ThemeProvider>,
  );

  expect(getByText('1.1')).toBeTruthy();
});
