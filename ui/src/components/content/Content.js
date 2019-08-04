import React, { Component } from 'react';
import { connect } from 'react-redux';

import CodeNote from './note-types/CodeNote';

const mapStateToProps = state => ({ notes: state.notes });

class Content extends Component {
  renderNote() {
    const { notes } = this.props;
    const activeNote = notes.find(note => note.active);

    return <CodeNote note={activeNote} />;
  }

  render() {
    return this.renderNote();
  }
}

export default connect(mapStateToProps)(Content);
