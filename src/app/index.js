import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';

const store = configureStore('renderer');

const render = () => {
  const Root = require('./containers/Root').default;
  ReactDOM.render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('root'));
};

render();

if (module.hot) {
  module.hot.accept(render);
}
