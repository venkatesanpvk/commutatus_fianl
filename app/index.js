import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import App from 'containers/App';
import history from 'containers/App/history';
import store from 'store';

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Router history={history}>
          <Component />
        </Router>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/App', () => renderApp(App));
}
