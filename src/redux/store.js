import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import saga from './saga';
import reducer from './reducer';
import {
  createReactNavigationReduxMiddleware,
  createNavigationPropConstructor,
} from 'react-navigation-redux-helpers';

const sagaMiddleware = createSagaMiddleware();

const navigatorMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

export const navigationPropConstructor = createNavigationPropConstructor('root');

const store = createStore(
  reducer,
  compose(
    applyMiddleware(navigatorMiddleware),
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  ),
);

sagaMiddleware.run(saga);

export default store;
