import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { monologueReducer } from './reducers/monologue';
import { editorReducer } from './reducers/editor';
import { authReducer } from './reducers/auth';
import { protectedDataReducer } from './reducers/protected-data';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth';

const reducers = {
  monologueReducer,
  editorReducer,
  auth: authReducer,
  form: formReducer,
  protectedData: protectedDataReducer
};

const reducer = combineReducers(reducers);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
