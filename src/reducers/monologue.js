import { FETCH_MONOLOGUE_REQUEST, FETCH_MONOLOGUE_SUCCESS, FETCH_MONOLOGUE_ERROR } from '../actions/monologue';

const initialState = {
  monologues: [],
  loading: false,
  error: null
};

export function monologueReducer(state = initialState, action) {
  if (action.type === FETCH_MONOLOGUE_REQUEST) {
    return Object.assign({}, state, { loading: true });
  }

  if (action.type === FETCH_MONOLOGUE_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      monologues: action.monologues
    });
  }

  if (action.type === FETCH_MONOLOGUE_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
}