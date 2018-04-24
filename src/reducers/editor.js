import { UPDATE_EDITOR_STATE, EMPTY_EDITOR_STATE } from '../actions/editor';
import { EditorState } from 'draft-js';

const initialState = {
  editorState: EditorState.createEmpty()
};

export function editorReducer(state = initialState, action) {
  if (action.type === UPDATE_EDITOR_STATE) {
    return Object.assign({}, state, { editorState: action.editorState });
  }
  else if (action.type === EMPTY_EDITOR_STATE) {
    return Object.assign({}, state, { editorState: EditorState.createEmpty() });
  }

  return state;
}