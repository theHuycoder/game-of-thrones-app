import React, { PropsWithChildren, useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { TextFieldProps } from '@material-ui/core';
import { StyledTextInput, StyledLoader } from './TextInput.styles';

type TextInputProps = TextFieldProps & {
  onFocusOut?: () => void;
  readOnly?: boolean;
  loading?: boolean;
};

const TextInput: React.FC<PropsWithChildren<TextInputProps>> = ({
  onChange = () => {},
  onFocusOut = () => {},
  children = null,
  color = 'secondary',
  variant = 'outlined',
  label = '',
  helperText = '',
  autoComplete = '',
  type = 'text',
  error = false,
  disabled = false,
  readOnly = false,
  loading = false,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledTextInput
      onChange={onChange}
      onBlur={onFocusOut}
      color={color}
      variant={variant}
      label={label}
      helperText={helperText}
      autoComplete={autoComplete}
      disabled={disabled}
      error={error}
      {...(type !== 'password' && {
        type,
      })}
      {...(type === 'password' && {
        type: showPassword ? 'text' : 'password',
      })}
      {...{
        InputProps: {
          ...(readOnly && {
            readOnly,
          }),
          ...(type === 'password' && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }),
          ...(loading && {
            endAdornment: (
              <InputAdornment position="end">
                <StyledLoader variant="indeterminate" />
              </InputAdornment>
            ),
          }),
        },
      }}
      {...inputProps}
    >
      {children}
    </StyledTextInput>
  );
};

export default TextInput;
