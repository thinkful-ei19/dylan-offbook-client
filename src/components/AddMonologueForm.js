import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { connect } from 'react-redux';
import { EditorState } from 'draft-js';
import { fetchMonologues, toggleAddForm } from '../actions/monologue';
import MyEditor from './Editor';
import 'draft-js/dist/Draft.css';
import { emptyEditorState } from '../actions/editor';

class AddMonologueForm extends Component {

  onSubmit(values) {
    const contentBlocks = this.props.editorState.getCurrentContent().getBlocksAsArray();
    const pureText = contentBlocks.map(item => item.text);
    values.text = pureText;

    return fetch(`${API_BASE_URL}/monologues`, {
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
      .then(() => this.props.dispatch(fetchMonologues()))
      .then(() => this.props.reset())
      .then(() => this.props.dispatch(emptyEditorState()))
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

  toggleAddForm() {
    this.props.dispatch(toggleAddForm(this.props.isAddFormHidden));
  }

  render() {

    const addForm = (<form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
      <label htmlFor="title">Title</label>
      <Field name="title" id="title" type="text" component="input" />
      <label htmlFor="playwright">Playwright</label>
      <Field name="playwright" id="playwright" type="text" component="input" />
      <label htmlFor="text">Text</label>
      <Field name="text" id="text" type="text" component={MyEditor} />
      <button type="submit">Submit</button>
    </form>);

    return (
      <div>
        {this.props.isAddFormHidden ? '' : addForm}
        <button onClick={() => this.toggleAddForm()}>{this.props.isAddFormHidden ? 'Add monologue' : 'Hide form'}</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorState: state.editorReducer.editorState,
  isAddFormHidden: state.monologueReducer.isAddFormHidden
});

const ConnectedAddMonologueForm = connect(mapStateToProps)(AddMonologueForm);

export default reduxForm({
  form: 'adding'
})(ConnectedAddMonologueForm);