import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { monologueReducer } from './reducers/monologue';
import './index.css';
import MonologueList from './components/MonologueList';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(monologueReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <MonologueList />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
