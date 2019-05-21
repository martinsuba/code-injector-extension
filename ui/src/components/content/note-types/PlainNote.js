import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editNote } from '../../../actions/note-actions';

const mapDispatchToProps = dispatch => ({
  editNote: note => dispatch(editNote(note)),
});

class PlainNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.note.content,
    };

    this.timeoutId = null;

    this.handleContentChange = this.handleContentChange.bind(this);
    this.saveContent = this.saveContent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.note !== prevProps.note) {
      this.setState({ content: this.props.note.content });
    }
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value }, () => {
      if (this.timeoutId == null) {
        const { content } = this.state;
        const { note } = this.props;

        this.timeoutId = setTimeout(() => {
          this.saveContent(content, note);
        }, 5000);
      }
    });
  }

  saveContent(content, note) {
    if (note.id !== this.props.note.id) {
      note.active = false;
    }

    const newNote = {
      ...note,
      content,
      updatedAt: Date.now(),
    };

    this.props.editNote(newNote);

    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }

  render() {
    return (
      <textarea
        onChange={this.handleContentChange}
        value={this.state.content}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(PlainNote);
