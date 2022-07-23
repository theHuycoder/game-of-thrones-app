import React from 'react';
import Box from '@material-ui/core/Box';
import styled, { css } from 'styled-components';

export const FlexBox = styled(
  ({ gap, alignItems, justifyContent, flexDirection, ...props }) => (
    <Box {...props} />
  ),
)`
  ${({
    theme: { spacing },
    gap,
    alignItems,
    justifyContent,
    flexDirection,
  }) => css`
    display: flex;
    flex-direction: ${flexDirection};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    gap: ${spacing(gap)}px;
  `}
`;
