import React from 'react';
import routes from './routes';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@/shared/ui-components';
import { APP_URL_MAP } from '../shared/utils/map';

function App() {
  return (
    <Box>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
        <Redirect from="" to={APP_URL_MAP.getLoginView()} />
      </Switch>
    </Box>
  );
}

export default App;
