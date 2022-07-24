import React from 'react';
import routes from './routes';
import redirects from './redirects';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Box, Snackbar } from '@/shared/ui-components';

function App() {
  return (
    <>
      <Box>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
        {redirects.map((redirect, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Redirect {...redirect} key={index} />
        ))}
      </Box>
      <Snackbar />
    </>
  );
}

export default App;
