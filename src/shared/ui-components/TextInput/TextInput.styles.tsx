import TextField from '@material-ui/core/TextField';
import styled, { css } from 'styled-components';
import { alpha } from '@material-ui/core/styles';
import { palette, spacing, typography, sizing } from '@material-ui/system';
import CircularProgress from '@material-ui/core/CircularProgress';

export const StyledTextInput = styled(TextField)`
  ${({ theme: { palette, spacing } }) => css`
    display: flex;
    margin: 0px ${spacing(2)}px;
    .MuiFormLabel-root {
      background-color: white;
      margin-left: -5px;
      padding: 0px 7px;
    }
    .MuiOutlinedInput-root {
      .MuiOutlinedInput-input:read-only {
        cursor: pointer;
        text-overflow: ellipsis;
      }
      .MuiOutlinedInput-notchedOutline {
        border-color: ${palette.tertiary.light};
      }
      &:hover {
        .MuiOutlinedInput-notchedOutline {
          box-shadow: 0 0 0 3px ${alpha(palette.secondary.main, 0.1)};
        }
      }
      &.Mui-error {
        .MuiOutlinedInput-notchedOutline {
          border-color: ${palette.error.main};
        }
      }
      &.Mui-focused {
        .MuiOutlinedInput-notchedOutline {
          border-color: ${palette.secondary.main};
          box-shadow: unset;
        }
        .MuiInputAdornment-root {
          .MuiSvgIcon-root {
            fill: ${palette.secondary.main};
          }
        }
      }
    }
    .MuiFormHelperText-root {
      &.Mui-error {
        color: ${palette.error.main};
      }
      &.Mui-focused {
        color: ${palette.secondary.main};
      }
    }
    .MuiFormLabel-root {
      &.Mui-error {
        color: ${palette.text.secondary};
      }
      &.MuiInputLabel-shrink.Mui-error {
        color: ${palette.error.main};
      }
      &.Mui-focused,
      &.MuiInputLabel-shrink.Mui-focused {
        color: ${palette.secondary.main};
      }
    }
  `};
  ${typography}
  ${spacing}
  ${palette}
  ${sizing}
`;

StyledTextInput.displayName = 'StyledTextInput';

export const StyledLoader = styled(CircularProgress)`
  ${({ theme: { palette } }) =>
    css`
      padding: 2px;
      .MuiCircularProgress-svg {
        color: ${palette.secondary.main};
      }
    `};
`;

StyledLoader.displayName = 'TextInputLoader';
