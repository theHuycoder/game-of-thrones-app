import React, { PropsWithChildren } from 'react';
import { Router } from 'react-router-dom';
import { history } from '@/shared/utils/history';

const RouterProvider = ({ children }: PropsWithChildren<{}>) => (
  <Router history={history}>{children}</Router>
);

export default RouterProvider;
