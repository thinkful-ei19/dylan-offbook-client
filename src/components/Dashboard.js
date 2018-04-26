import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from './RequiresLogin';
import { fetchProtectedData } from '../actions/protected-data';
import MonologueList from './MonologueList';

export class Dashboard extends React.Component {
  componentDidMount() {
    console.log(this);
    // fetchProtectedData();
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    return (
      <MonologueList />
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;

  return {
    username: state.auth.currentUser.username,
    protectedData: state.protectedData.data
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));