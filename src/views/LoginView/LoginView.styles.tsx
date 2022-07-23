import styled, { css } from 'styled-components';
import { FlexBox, Box } from '@/shared/ui-components';

// export const ViewWrapper = styled(FlexBox)`
// 	${()=> }
// `;

export const LogoWrapper = styled(Box)`
  ${({ theme: { spacing } }) => css`
    width: ${spacing(30)}px;
    margin: 0 auto;
  `}
`;
