import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { monologueReducer } from './reducers/monologue';
import { editorReducer } from './reducers/editor';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const reducers = {
  monologueReducer,
  editorReducer,
  form: formReducer
};

const reducer = combineReducers(reducers);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
