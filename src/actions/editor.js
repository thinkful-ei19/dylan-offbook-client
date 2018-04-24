export const UPDATE_EDITOR_STATE = 'UPDATE_EDITOR_STATE';
export const updateEditorState = editorState => ({
  type: UPDATE_EDITOR_STATE,
  editorState
});

export const EMPTY_EDITOR_STATE = 'EMPTY_EDITOR_STATE';
export const emptyEditorState = editorState => ({
  type: EMPTY_EDITOR_STATE,
  editorState
});