import React from 'react';
import { render } from '@testing-library/react-native';

import { Loading } from './index';

jest.mock('./Loading.style', () => ({
  Container: 'Container',
  Animation: 'Animation',
}));
jest.mock('assets/lottie/loading.json', () => 'LoadingLottie');

describe('Given Loading component', () => {
  it('Should render animation component correctly', () => {
    const { getByTestId } = render(<Loading />);
    expect(getByTestId('LoadingAnimation')).toBeTruthy();
  });

  it('Should render animation component with source', () => {
    const { getByTestId } = render(<Loading />);
    const { source } = getByTestId('LoadingAnimation').props;
    expect(source).toEqual('LoadingLottie');
  });
});
