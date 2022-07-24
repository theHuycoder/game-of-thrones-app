import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CopyConsts, ValidationConsts } from '@/shared/consts';
import { AuthClientService } from '@/services';
import { LocalStorageUtils } from '@/shared/utils';
import { redirectTo } from '../../shared/utils/history';
import { APP_URL_MAP } from '../../shared/utils/map';
import { useSnackbarStore } from '@/shared/store';

export type LoginFormValues = {
  email: string;
  password: string;
};

const getDefaultValues = () => ({
  email: '',
  password: '',
});

export const useLoginForm = () => {
  const defaultValues = useMemo(() => getDefaultValues(), []);

  const form = useForm<LoginFormValues>({
    mode: 'onChange',
    defaultValues,
  });

  const {
    register,
    formState: { errors },
    setError,
  } = form;

  const { validation: ValidationCopyConsts } = CopyConsts;

  useEffect(() => {
    register('email', {
      required: {
        value: true,
        message: ValidationCopyConsts.required('Email'),
      },
      pattern: {
        value: ValidationConsts.emailValidation,
        message: ValidationCopyConsts.invalidEmail,
      },
    });

    register('password', {
      required: {
        value: true,
        message: ValidationCopyConsts.required('Password'),
      },
    });
  }, [register]);

  const onSubmitSuccess = async ({ email, password }: LoginFormValues) => {
    const resp = await AuthClientService.postLogin({ email, password }).catch(
      (err) => {
        if (err?.response?.data?.errorMessage) {
          setError('password', {
            message: err.response.data.errorMessage,
          });
          useSnackbarStore
            .getState()
            .onSnackbar('Did you try ? email: test1@abc.com, password: 123456');
        }
      },
    );

    if (!resp) return;
    const { authToken, expiresOn } = resp.data;
    LocalStorageUtils.saveAuthToken({ authToken, expiresOn });
    redirectTo(APP_URL_MAP.getCharactersView());
  };

  const isError = (inputName: keyof LoginFormValues) => {
    if (errors && errors[inputName]) return true;
    return false;
  };

  const getHelperText = (inputName: keyof LoginFormValues) => {
    if (errors && errors[inputName]) {
      return errors?.[inputName]?.message;
    }
    return '';
  };

  return {
    form,
    isError,
    getHelperText,
    onSubmitSuccess,
  };
};
