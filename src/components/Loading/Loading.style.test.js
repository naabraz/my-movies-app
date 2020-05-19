import 'jest-styled-components/native';
import React from 'react';
import renderer from 'react-test-renderer';

import * as Styled from './Loading.style';

describe('Given Loading component style', () => {
  it('Should render Container component correctly', () => {
    const loadingComponent = renderer.create(<Styled.Container />).toJSON();
    expect(loadingComponent).toHaveStyleRule('justify-content', 'center');
    expect(loadingComponent).toHaveStyleRule('align-self', 'center');
  });
});
