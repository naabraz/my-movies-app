import 'jest-styled-components/native';
import React from 'react';
import renderer from 'react-test-renderer';

import * as Styled from './PopularMovies.style';

describe('Given Screen component style', () => {
  it('Should render Container component correctly', () => {
    const containerComponent = renderer.create(<Styled.Container />).toJSON();
    expect(containerComponent).toHaveStyleRule('background-color', '#eee');
  });

  it('Should render Movies view component correctly', () => {
    const moviesComponent = renderer.create(<Styled.Movies />).toJSON();
    expect(moviesComponent).toHaveStyleRule('flex-wrap', 'wrap');
    expect(moviesComponent).toHaveStyleRule('flex-direction', 'row');
    expect(moviesComponent).toHaveStyleRule('justify-content', 'center');
  });
});
