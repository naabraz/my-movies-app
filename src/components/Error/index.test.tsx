import React from 'react';
import { render } from '@testing-library/react-native';

import Error from './index';

jest.mock('assets/lottie/error.json', () => 'ErrorLottie');

test('should render animation component correctly', () => {
  const { getByTestId } = render(<Error />);
  const {
    props: { sourceName },
  } = getByTestId('ErrorAnimation');

  expect(sourceName).toEqual('ErrorLottie');
  expect(getByTestId('ErrorAnimation')).toBeTruthy();
});
