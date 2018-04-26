import React from 'react';
import { connect } from 'react-redux';
import RequiresLogin from './RequiresLogin';
import { fetchProtectedData } from '../actions/protected-data';
import MonologueList from './MonologueList';
import AddMonologueForm from './AddMonologueForm';

export class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <AddMonologueForm />
        <MonologueList />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    protectedData: state.protectedData.data
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));