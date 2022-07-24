import { Box } from '@/shared/ui-components';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Box)`
  ${() => css`
    min-height: 100vh;
  `}
`;
