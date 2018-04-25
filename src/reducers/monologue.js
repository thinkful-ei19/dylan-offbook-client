import { FETCH_MONOLOGUE_REQUEST, FETCH_MONOLOGUE_SUCCESS, FETCH_MONOLOGUE_ERROR, TOGGLE_MONOLOGUE, TOGGLE_ADD_FORM, TOGGLE_COMMENTS } from '../actions/monologue';
import { FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_ERROR } from '../actions/comment';

const initialState = {
  monologues: [],
  isHidden: true,
  isAddFormHidden: false,
  areCommentsHidden: true,
  loading: false,
  error: null
};

export function monologueReducer(state = initialState, action) {
  if (action.type === FETCH_MONOLOGUE_REQUEST) {
    return Object.assign({}, state, { loading: true });
  }
  else if (action.type === FETCH_MONOLOGUE_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      isHidden: true,
      isAddFormHidden: false,
      areCommentsHidden: true,
      monologues: action.monologues
    });
  }
  else if (action.type === FETCH_MONOLOGUE_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if (action.type === TOGGLE_MONOLOGUE) {
    const newArr = state.monologues.map(monologue => {
      if (monologue.id !== action.id) {
        return monologue;
      }
      return Object.assign({}, monologue, { isHidden: !monologue.isHidden });
    });
    return Object.assign({}, state, { monologues: newArr });
  }
  else if (action.type === TOGGLE_COMMENTS) {
    const newArr = state.monologues.map(monologue => {
      if (monologue.id !== action.id) {
        return monologue;
      }
      return Object.assign({}, monologue, { areCommentsHidden: !monologue.areCommentsHidden });
    });
    return Object.assign({}, state, { monologues: newArr });
  }
  else if (action.type === TOGGLE_ADD_FORM) {
    return Object.assign({}, state, { isAddFormHidden: !action.isAddFormHidden });
  }
  else if (action.type === FETCH_COMMENTS_REQUEST) {
    return Object.assign({}, state, { loading: true });
  }
  else if (action.type === FETCH_COMMENTS_SUCCESS) {
    const newArr = state.monologues.map(monologue => {
      if (monologue.id !== action.monologueId) {
        return monologue;
      }
      return Object.assign({}, monologue, { areCommentsHidden: false, isHidden: false, comments: action.monologue.comments });
    });
    return Object.assign({}, state, { monologues: newArr });
  }
  else if (action.type === FETCH_COMMENTS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }

  return state;
}