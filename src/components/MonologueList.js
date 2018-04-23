import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMonologues } from '../actions/monologue';

class MonologueList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchMonologues());
  }

  render() {

    const monologue = this.props.monologues.map((monologue, index) => {
      return (<li key={index}>{monologue.playwright}: {monologue.lines}</li>);
    });

    return (
      <ul>
        {monologue}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  monologues: state.monologues
});

export default connect(mapStateToProps)(MonologueList);