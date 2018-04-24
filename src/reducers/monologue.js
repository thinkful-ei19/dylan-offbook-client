import { FETCH_MONOLOGUE_REQUEST, FETCH_MONOLOGUE_SUCCESS, FETCH_MONOLOGUE_ERROR, TOGGLE_MONOLOGUE } from '../actions/monologue';

const initialState = {
  monologues: [],
  isHidden: false,
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

  return state;
}