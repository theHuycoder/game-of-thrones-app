import styled, { css } from 'styled-components';

export const StyledLogo = styled.img`
  ${({ theme: { spacing }, width, height }) => css`
    width: ${typeof width === 'number' ? `${spacing(width)}px` : width};
    height: ${typeof height === 'number' ? `${spacing(height)}px` : height};
  `}
`;
