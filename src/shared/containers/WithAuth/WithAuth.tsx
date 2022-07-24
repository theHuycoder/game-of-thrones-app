import React from 'react';
import { useAuth } from '@/shared/hooks/useAuth';

// eslint-disable-next-line no-undef
const WithAuth = (WrappedComponent: any) => {
  function Auth(props: any) {
    const { user } = useAuth();

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  }

  return Auth;
};

export default WithAuth;
