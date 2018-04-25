import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddCommentForm from './AddCommentForm';
import { fetchMonologues, toggleMonologue, toggleComments } from '../actions/monologue';
import { toggleAddComment } from '../actions/comment';

class MonologueList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchMonologues());
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
      console.log(monologue);
      let comments = '';
      if (!monologue.areCommentsHidden && !monologue.isHidden) {
        comments = monologue.comments.map((comment, index) => <p key={index}>{comment.comment}</p>);
      }

      return (<li key={index}>
        <strong>{monologue.title}</strong> by {monologue.playwright}
        <button type="button" onClick={() => this.toggleHidden(monologue.id)}>{monologue.isHidden ? 'Show Monologue' : 'Hide Monologue'}</button>
        {monologue.isHidden ? '' : <button type="button" onClick={() => this.toggleComments(monologue.id)}>{monologue.areCommentsHidden ? 'Show comments' : 'Hide comments'}</button>}
        {monologue.isHidden ? '' : <button type="button" onClick={() => this.toggleAddComment(monologue.id)}>Add comment</button>}
        {(monologue.isAddCommentHidden) ? '' : <AddCommentForm key={monologue.id} form={monologue.id} monologueId={monologue.id} />}
        {monologue.isHidden ? '' : monologue.text.map((line, index) => <p key={index}>{index + 1}: {line}</p>)}
        {comments}
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