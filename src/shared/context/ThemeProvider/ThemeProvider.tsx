import React, { PropsWithChildren } from 'react';

import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import theme from '@/shared/theme';

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const themeValues = theme();

  return (
    <StylesProvider injectFirst>
      <CssBaseline />
      <StyledThemeProvider theme={themeValues}>
        <ThemeProvider theme={themeValues}>{children}</ThemeProvider>
      </StyledThemeProvider>
    </StylesProvider>
  );
};

export default AppThemeProvider;
