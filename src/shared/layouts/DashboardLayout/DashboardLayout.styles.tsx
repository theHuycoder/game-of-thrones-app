import styled, { css } from 'styled-components';
import { Grid, Box } from '@/shared/ui-components';

export const Container = styled(Box)`
  ${({ theme: { spacing } }) => css`
    padding: 0 ${spacing(10)}px;
  `}
`;

export const Header = styled(Grid)`
  ${({ theme: { spacing, palette } }) => css`
    padding-top: ${spacing(5)}px;
    padding-bottom: ${spacing(2)}px;
    margin-bottom: ${spacing(2)}px;
    border-bottom: 1px ${palette.divider} solid;
  `}
`;
