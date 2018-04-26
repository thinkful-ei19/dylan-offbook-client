import { API_BASE_URL } from '../config';

export const FETCH_MONOLOGUE_REQUEST = 'FETCH_MONOLOGUE_REQUEST';
export const fetchMonologueRequest = () => ({
  type: FETCH_MONOLOGUE_REQUEST
});

export const FETCH_MONOLOGUE_SUCCESS = 'FETCH_MONOLOGUE_SUCCESS';
export const fetchMonologueSuccess = monologues => ({
  type: FETCH_MONOLOGUE_SUCCESS,
  monologues
});

export const FETCH_MONOLOGUE_ERROR = 'FETCH_MONOLOGUE_ERROR';
export const fetchMonologueError = error => ({
  type: FETCH_MONOLOGUE_ERROR,
  error
});

export const fetchMonologues = (authToken) => dispatch => {
  dispatch(fetchMonologueRequest());
  return fetch(`${API_BASE_URL}/monologues`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(data => dispatch(fetchMonologueSuccess(data)))
    .catch(err => dispatch(fetchMonologueError(err)));
};

export const TOGGLE_MONOLOGUE = 'TOGGLE_MONOLOGUE';
export const toggleMonologue = (id) => ({
  type: TOGGLE_MONOLOGUE,
  id
});

export const TOGGLE_COMMENTS = 'TOGGLE_COMMENTS';
export const toggleComments = (id) => ({
  type: TOGGLE_COMMENTS,
  id
});

export const TOGGLE_ADD_FORM = 'TOGGLE_ADD_FORM';
export const toggleAddForm = isAddFormHidden => ({
  type: TOGGLE_ADD_FORM,
  isAddFormHidden
});
