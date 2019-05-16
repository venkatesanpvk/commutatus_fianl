import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import List from 'components/Pages/List';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/" component={List} />
    </Switch>
  </React.Fragment>
);

export default App;
