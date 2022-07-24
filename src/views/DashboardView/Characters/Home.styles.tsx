import styled, { css } from 'styled-components';
import { Box } from '@/shared/ui-components';

export const Wrapper = styled(Box)`
  ${({ theme: { spacing } }) => css`
    padding-top: ${spacing(5)}px;
  `}
`;
