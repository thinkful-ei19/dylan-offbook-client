import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddCommentForm from './AddCommentForm';
import { fetchMonologues, toggleMonologue, toggleComments } from '../actions/monologue';
import { toggleAddComment } from '../actions/comment';

class MonologueList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchMonologues(this.props.authToken));
  }

  toggleHidden(id) {
    this.props.dispatch(toggleMonologue(id));
  }

  toggleComments(id) {
    this.props.dispatch(toggleComments(id));
  }

  toggleAddComment(id) {
    this.props.dispatch(toggleAddComment(id));
  }

  render() {
    const monologue = this.props.monologues.map((monologue, index) => {
      let comments = '';
      if (!monologue.areCommentsHidden && !monologue.isHidden) {
        comments = monologue.comments.map((comment, index) => <li key={index}>{comment.comment}</li>);
      }

      let addCommentForm = '';
      if (!monologue.isAddCommentHidden && !monologue.isHidden) {
        addCommentForm = (<AddCommentForm key={monologue.id} form={monologue.id} monologueId={monologue.id} />);
      }

      return (<li className="monologues__item" key={index}>
        <strong>{monologue.title}</strong> by {monologue.playwright}
        <button className="monologues__toggle" type="button" onClick={() => this.toggleHidden(monologue.id)}>{monologue.isHidden ? 'Show Monologue' : 'Hide Monologue'}</button>
        {monologue.isHidden ? '' : <button className="monologues__toggle-comments" type="button" onClick={() => this.toggleComments(monologue.id)}>{monologue.areCommentsHidden ? 'Show comments' : 'Hide comments'}</button>}
        {monologue.isHidden ? '' : <button className="monologues__toggle-add-comment" type="button" onClick={() => this.toggleAddComment(monologue.id)}>Add comment</button>}
        {addCommentForm}
        <div className="monologues__wrapper">
          <div className="monologues__lines">
            {monologue.isHidden ? '' : monologue.text.map((line, index) => <p key={index}>{line}</p>)}
          </div>
          <ul>{comments}</ul>
        </div>
      </li>);
    });

    return (
      <div>
        <p><strong>Saved Monologues</strong></p>
        <ul className="monologues">
          {monologue}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken,
  monologues: state.monologueReducer.monologues
});

export default connect(mapStateToProps)(MonologueList);