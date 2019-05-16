import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Routes from './routes';

class Index extends Component {
  render() {
    return (
      <React.Fragment>
        <Route component={Routes} />
      </React.Fragment>
    );
  }
}

export default Index;
