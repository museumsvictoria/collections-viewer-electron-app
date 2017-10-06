import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    createLogger({
      collapsed: true,
    }),
    sagaMiddleware,
  ];

  const enhanced = [
    applyMiddleware(...middleware),
  ];

  const store = createStore(rootReducer, compose(...enhanced));

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('../reducers/rootReducer').default);
    });
  }

  return store;
}
