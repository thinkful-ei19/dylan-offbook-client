import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import RegistrationPage from './components/RegistrationPage';
import HeaderBar from './components/HeaderBar';

class App extends Component {

  render() {
    return (
      <div>
        <HeaderBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={RegistrationPage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
