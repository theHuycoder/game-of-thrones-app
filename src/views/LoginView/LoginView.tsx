import React, { PropsWithChildren } from 'react';
import { Controller } from 'react-hook-form';
import {
  TextInput,
  Container,
  Logo,
  Grid,
  Typography,
  FlexBox,
  Box,
  Button,
} from '@/shared/ui-components';

import { LogoWrapper } from './LoginView.styles';
import { CopyConsts } from '@/shared/consts';
import { useLoginForm } from './useLoginForm';
import { useAuth } from '@/shared/hooks';
import { APP_URL_MAP } from '@/shared/utils';

export type LoginViewProps = PropsWithChildren<{}>;

const LoginView: React.FC<LoginViewProps> = () => {
  useAuth({ redirectOnSuccessUrl: APP_URL_MAP.getDashboardView() });

  const { loginView: loginViewConst } = CopyConsts;

  const { form, getHelperText, isError, onSubmitSuccess } = useLoginForm();

  const { handleSubmit, control } = form;

  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12}>
          <FlexBox
            alignItems="center"
            justifyContent="center"
            gap={1}
            flexDirection="column"
            pt={12}
          >
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
            <Typography variant="h5">{loginViewConst.head}</Typography>
            <Typography variant="h6">{loginViewConst.subhead}</Typography>
          </FlexBox>
        </Grid>
        <Grid item xs={12}>
          <FlexBox
            component="form"
            flexDirection="column"
            alignItems="center"
            gap={2}
            px={12}
            onSubmit={handleSubmit(onSubmitSuccess)}
          >
            <Box>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextInput
                    variant="outlined"
                    onChange={field.onChange}
                    label="Email"
                    error={isError('email')}
                    helperText={getHelperText('email')}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <TextInput
                    variant="outlined"
                    onChange={field.onChange}
                    label="Password"
                    error={isError('password')}
                    helperText={getHelperText('password')}
                  />
                )}
              />
            </Box>
            <Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Sign in
              </Button>
            </Box>
          </FlexBox>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginView;
