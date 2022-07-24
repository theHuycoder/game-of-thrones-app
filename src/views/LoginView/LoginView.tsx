import React, { PropsWithChildren } from 'react';
import { Controller } from 'react-hook-form';
import {
  TextInput,
  Typography,
  FlexBox,
  Box,
  Button,
  Grid,
} from '@/shared/ui-components';

import {
  ButtonWrapper,
  WrapperPaper,
  Container,
  Head,
} from './LoginView.styles';
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
    <Container>
      <WrapperPaper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FlexBox
              alignItems="center"
              justifyContent="center"
              gap={1}
              flexDirection="column"
              pt={12}
            >
              <Head>{loginViewConst.head}</Head>
              <Typography variant="h6">{loginViewConst.subhead}</Typography>
            </FlexBox>
          </Grid>
          <Grid item xs={12}>
            <FlexBox
              component="form"
              flexDirection="column"
              alignItems="strech"
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
                      placeholder="test1@abc.com"
                      variant="outlined"
                      onChange={field.onChange}
                      label="Email is test1@abc.com"
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
                      placeholder="123456"
                      type="password"
                      variant="outlined"
                      onChange={field.onChange}
                      label="Password is 123456"
                      error={isError('password')}
                      helperText={getHelperText('password')}
                    />
                  )}
                />
              </Box>
              <ButtonWrapper>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Sign in
                </Button>
              </ButtonWrapper>
            </FlexBox>
          </Grid>
        </Grid>
      </WrapperPaper>
    </Container>
  );
};

export default LoginView;
