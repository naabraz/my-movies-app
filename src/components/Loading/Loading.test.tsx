import React from 'react';
import { render } from '@testing-library/react-native';

import { Loading } from './';

jest.mock('./Loading.style', () => ({
  Container: 'Container',
  Animation: 'Animation',
}));

describe('Given Loading component', () => {
  it('Should render animation component correctly', () => {
    const { getAllByTestId } = render(<Loading />);
    expect(getAllByTestId('LoadingAnimation')).toBeTruthy();
  });

  it('Should render animation component with source', () => {
    const { getAllByTestId } = render(<Loading />);
    const { source } = getAllByTestId('LoadingAnimation')[0].props;
    expect(source).toBeInstanceOf(Object);
  });
});
