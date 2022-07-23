import React from 'react';
import { FlexBox as StyledFlexBox } from './FlexBox.styles';
import { BoxProps } from '@material-ui/core';

type FlexBoxProps = BoxProps & {
  gap?: number;
};

const FlexBox: React.FC<FlexBoxProps> = ({ gap = 0, ...props }) => (
  <StyledFlexBox gap={gap} {...props} />
);

export default FlexBox;
