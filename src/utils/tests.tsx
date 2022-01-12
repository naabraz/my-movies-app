import React, { FC, ReactElement } from 'react';
import {
  render,
  RenderAPI,
  RenderOptions,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@gympass/yoga';

const ComponentWithProviders: FC = ({ children }) => {
  return (
    <ThemeProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderAPI => render(ui, { wrapper: ComponentWithProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
