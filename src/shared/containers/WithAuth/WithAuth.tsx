import React from 'react';
import { useAuth } from '@/shared/hooks/useAuth';

// eslint-disable-next-line no-undef
function WithAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
) {
  const Auth = (props: P) => {
    const { user } = useAuth();

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
}

export default WithAuth;
