import React from 'react';
import { render } from '@testing-library/react-native';

import Loading from './index';

jest.mock('assets/lottie/loading.json', () => 'LoadingLottie');

test('should render animation component correctly', () => {
  const { getByTestId } = render(<Loading />);
  const {
    props: { sourceName },
  } = getByTestId('LoadingAnimation');

  expect(getByTestId('LoadingAnimation')).toBeTruthy();
  expect(sourceName).toEqual('LoadingLottie');
});
