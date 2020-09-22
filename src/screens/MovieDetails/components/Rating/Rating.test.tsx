import React from 'react';
import { render } from '@testing-library/react-native';

import { Rating } from './Rating';

describe('Given Rating component', () => {
  it('Should render star image', () => {
    const { getByTestId } = render(<Rating voteAverage={1.1} />);

    expect(getByTestId('RatingStar')).toBeTruthy();
  });

  it('Should render vote average received', () => {
    const { getByText } = render(<Rating voteAverage={1.1} />);

    expect(getByText('1.1')).toBeTruthy();
  });
});
