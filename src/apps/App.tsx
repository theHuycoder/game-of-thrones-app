import React from 'react';
import routes from './routes';

import { Box } from '@/shared/ui-components';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Box>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </Box>
  );
}

export default App;
