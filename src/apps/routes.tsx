import React from 'react';
import { APP_URL_MAP } from '@/shared/utils';
import { LoginView, DashboardView } from '@/views';

export default [
  {
    path: APP_URL_MAP.getLoginView(),
    render: (props: any) => <LoginView {...props} />,
  },
  {
    path: APP_URL_MAP.getDashboardView(),
    render: (props: any) => <DashboardView {...props} />,
  },
];
