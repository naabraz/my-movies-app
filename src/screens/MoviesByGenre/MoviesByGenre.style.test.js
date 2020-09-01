import 'jest-styled-components/native';
import React from 'react';
import renderer from 'react-test-renderer';

import * as Styled from './MoviesByGenre.style';

describe('Given MoviesByGenre component style', () => {
  it('Should render Movies view component correctly', () => {
    const moviesComponent = renderer.create(<Styled.Movies />).toJSON();
    expect(moviesComponent).toHaveStyleRule('flex-wrap', 'wrap');
    expect(moviesComponent).toHaveStyleRule('flex-direction', 'row');
    expect(moviesComponent).toHaveStyleRule('justify-content', 'center');
  });
});
