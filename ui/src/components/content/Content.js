import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PlainNote, CodeNote, TodoNote } from './note-types';

const mapStateToProps = state => ({ notes: state.notes });

class Content extends Component {
  renderNote() {
    const { notes } = this.props;
    const activeNote = notes.find(note => note.active);

    switch (activeNote.type) {
      case 'plain':
        return <PlainNote note={activeNote} />;
      case 'todo':
        return <TodoNote note={activeNote} />;
      case 'code':
        return <CodeNote note={activeNote} />;
      default:
        throw new Error('Invalid type.');
    }
  }

  render() {
    return this.renderNote();
  }
}

export default connect(mapStateToProps)(Content);
