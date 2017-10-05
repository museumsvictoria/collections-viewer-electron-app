import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './App';

export default function Root(props) {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
