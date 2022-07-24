import styled, { css } from 'styled-components';
import { Box, Paper, FlexBox, Typography } from '@/shared/ui-components';

export const Container = styled(FlexBox)`
  ${() => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/assets/images/login-bg.webp');
    background-size: cover;
    min-height: 100vh;
    text-align: center;
  `}
`;

export const LogoWrapper = styled(Box)`
  ${({ theme: { spacing } }) => css`
    width: ${spacing(30)}px;
    margin: 0 auto;
  `}
`;

export const WrapperPaper = styled(Paper)`
  ${({ theme: { spacing } }) => css`
    padding: ${spacing(5)}px ${spacing(3)}px;
    width: ${spacing(60)}px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `}
`;

export const ButtonWrapper = styled(Box)`
  ${({ theme: { spacing } }) => css`
    padding: 0 ${spacing(2)}px;
  `}
`;

export const Head = styled(Typography)`
  ${({ theme: { typography } }) => css`
    ${{ ...typography.h4 }}
    font-weight: 700;
  `}
`;
