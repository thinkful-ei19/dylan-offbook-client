import { API_BASE_URL } from '../config';

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST
});

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const fetchCommentsSuccess = (monologue, monologueId) => ({
  type: FETCH_COMMENTS_SUCCESS,
  monologueId,
  monologue
});

export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';
export const fetchCommentsError = error => ({
  type: FETCH_COMMENTS_ERROR,
  error
});

export const fetchComments = (monologueId) => dispatch => {
  dispatch(fetchCommentsRequest());
  return fetch(`${API_BASE_URL}/monologues/${monologueId}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then((data) => dispatch(fetchCommentsSuccess(data, monologueId)))
    .catch(err => dispatch(fetchCommentsError(err)));
};
