import 'jest-styled-components/native';
import React from 'react';
import renderer from 'react-test-renderer';

import * as Styled from './List.style.js';

describe('Given List component style', () => {
  it('Should render List component correctly', () => {
    const listContainer = renderer.create(<Styled.Container />).toJSON();
    expect(listContainer).toHaveStyleRule('margin-horizontal', 4);
    expect(listContainer).toHaveStyleRule('margin-vertical', 4);
    expect(listContainer).toHaveStyleRule('flex-wrap', 'wrap');
    expect(listContainer).toHaveStyleRule('flex-direction', 'row');
    expect(listContainer).toHaveStyleRule('background-color', '#222831');
    expect(listContainer).toHaveStyleRule('border-radius', 10);
  });

  it('Should render MovieInfoContainer component correctly', () => {
    const movieInfoContainer = renderer
      .create(<Styled.MovieInfoContainer />)
      .toJSON();
    expect(movieInfoContainer).toHaveStyleRule('margin-horizontal', 12);
    expect(movieInfoContainer).toHaveStyleRule('margin-vertical', 12);
  });

  it('Should render MovieTitle component correctly', () => {
    const movieTitle = renderer.create(<Styled.MovieTitle />).toJSON();
    expect(movieTitle).toHaveStyleRule('color', '#fff');
    expect(movieTitle).toHaveStyleRule('font-size', 12);
    expect(movieTitle).toHaveStyleRule('text-transform', 'uppercase');
    expect(movieTitle).toHaveStyleRule('align-self', 'center');
  });
});
