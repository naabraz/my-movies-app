import React from 'react';
import { render } from '@testing-library/react-native';

import { Error } from './index';

jest.mock('./Error.style', () => ({
  Container: 'Container',
  Animation: 'Animation',
}));
jest.mock('assets/lottie/error.json', () => 'ErrorLottie');

describe('Given Error component', () => {
  it('Should render animation component correctly', () => {
    const { getByTestId } = render(<Error />);
    expect(getByTestId('ErrorAnimation')).toBeTruthy();
  });

  it('Should render animation component with source', () => {
    const { getByTestId } = render(<Error />);
    const { source } = getByTestId('ErrorAnimation').props;
    expect(source).toEqual('ErrorLottie');
  });
});
