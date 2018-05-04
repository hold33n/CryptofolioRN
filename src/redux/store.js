import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)) )

sagaMiddleware.run(saga)


export default store
