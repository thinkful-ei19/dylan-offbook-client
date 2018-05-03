import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="landing">
      <h2 className="landing__heading">Welcome to Offbook</h2>
      <p>Offbook is a home for your monologue organization! Simply add a monologue with a title, playwright and text and save it to your home! You can add comments and take notes on each monologue. Login or sign up below!</p>
      <LoginForm />
      <Link to="/register">Register</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);