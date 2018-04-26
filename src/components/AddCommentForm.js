import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { connect } from 'react-redux';
import { fetchMonologues } from '../actions/monologue';
import { fetchComments } from '../actions/comment';

class AddCommentForm extends Component {

  onSubmit(values, id) {
    return fetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          if (res.headers.has('content-type') && res.headers.get('content-type').startsWith('application/json')) {
            return res.json().then(err => Promise.reject(err));
          }
          return Promise.reject({
            code: res.status,
            message: res.statusText
          });
        }
        return;
      })
      .then(() => this.props.dispatch(fetchComments(id)))
      .then(() => this.props.reset())
      .catch(err => {
        const { reason, message, location } = err;
        if (reason === 'Validation Error') {
          return Promise.reject(
            new SubmissionError({
              [location]: message
            })
          );
        }
        return Promise.reject(
          new SubmissionError({
            _error: 'Error submitting monologue'
          })
        );
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit((values) => this.onSubmit(values, this.props.monologueId))}>
          <Field name="comment" component="textarea" />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.monologueReducer.id
});

const ConnectedAddCommentForm = connect(mapStateToProps)(AddCommentForm);

export default reduxForm({
  form: 'comments'
})(ConnectedAddCommentForm);