import React from 'react';
import { APP_URL_MAP } from '@/shared/utils';
import { LoginView, LoginViewProps } from '@/views';

export default [
  {
    path: APP_URL_MAP.getLoginView(),
    render: (props: any) => <LoginView {...props} />,
  },
];
