import React, { memo } from 'react';
import { StyledLogo } from './Logo.styles';

type LogoProps = {
  width?: string | number;
  height?: string | number;
  alt?: string;
};

const Logo: React.FC<LogoProps> = ({
  width = '100%',
  height = '100%',
  alt = 'Game of thrones',
}) => {
  return (
    <StyledLogo
      src="/assets/images/logo.svg"
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default memo(Logo);
