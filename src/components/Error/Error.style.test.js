import 'jest-styled-components/native';
import React from 'react';
import renderer from 'react-test-renderer';

import * as Styled from './Error.style';

describe('Given Error component style', () => {
  it('Should render Container component correctly', () => {
    const errorComponent = renderer.create(<Styled.Container />).toJSON();
    expect(errorComponent).toHaveStyleRule('justify-content', 'center');
    expect(errorComponent).toHaveStyleRule('align-self', 'center');
  });
});
