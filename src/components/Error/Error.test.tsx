import React from 'react';
import { render } from 'react-native-testing-library';

import { Error } from './';

jest.mock('./Error.style', () => ({
  Container: 'Container',
  Animation: 'Animation',
}));

describe('Given Error component', () => {
  it('Should render animation component correctly', () => {
    const { getAllByTestId } = render(<Error />);
    expect(getAllByTestId('ErrorAnimation')).toBeTruthy();
  });

  it('Should render animation component with source', () => {
    const { getAllByTestId } = render(<Error />);
    const { source } = getAllByTestId('ErrorAnimation')[0].props;
    expect(source).toBeInstanceOf(Object);
  });
});
