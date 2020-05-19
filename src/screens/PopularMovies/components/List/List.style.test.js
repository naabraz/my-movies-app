import 'jest-styled-components/native';
import React from 'react';
import renderer from 'react-test-renderer';

import * as Styled from './List.style.js';

describe('Given List component style', () => {
  it('Should render List component correctly', () => {
    const listContainer = renderer.create(<Styled.Container />).toJSON();
    expect(listContainer).toHaveStyleRule('margin-horizontal', 4);
    expect(listContainer).toHaveStyleRule('margin-vertical', 4);
  });
});
