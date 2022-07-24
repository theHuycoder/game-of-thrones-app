import styled, { css } from 'styled-components';
import { Typography } from '@/shared/ui-components';

export const Title = styled(Typography)`
  ${() => css`
    font-weight: 700;
  `}
`;
