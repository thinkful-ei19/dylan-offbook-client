import React, { Component } from 'react';
// import { RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import { connect } from 'react-redux';
import { updateEditorState } from '../actions/editor';
import './Editor.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

class MyEditor extends Component {

  onChange(editorState) {
    this.props.dispatch(updateEditorState(editorState));
  }

  // _onBoldClick() {
  //   this.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'));
  // }

  render() {
    return (
      <div>
        <div className="editor-wrap">
          {/* <button type="button" onClick={this._onBoldClick.bind(this)}>Bold</button> */}
          <div className="editor">
            <Editor
              editorState={this.props.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange.bind(this)}
              plugins={[emojiPlugin]}
            />
            <EmojiSuggestions />
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  editorState: state.editorReducer.editorState
});

export default connect(mapStateToProps)(MyEditor);