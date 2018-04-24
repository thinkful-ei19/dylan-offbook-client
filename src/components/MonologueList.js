import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMonologues, toggleMonologue } from '../actions/monologue';

class MonologueList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchMonologues());
  }

  toggleHidden(id) {
    this.props.dispatch(toggleMonologue(id));
  }

  render() {

    const monologue = this.props.monologues.map((monologue, index) => {
      return (<li key={index}>
        <strong>{monologue.title}</strong> by {monologue.playwright}
        <button type="button" onClick={(e) => this.toggleHidden(monologue.id)}>{monologue.isHidden ? 'Show Monologue' : 'Hide Monologue'}</button>
        {monologue.isHidden ? '' : monologue.text.map((line, index) => <p key={index}>{line}</p>)}
      </li>);
    });

    return (
      <ul>
        {monologue}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  monologues: state.monologueReducer.monologues
});

export default connect(mapStateToProps)(MonologueList);