import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ListItem.css';
import { editNote, deleteNote, setActiveNote } from '../../../../actions/note-actions';

const mapStateToProps = state => ({ activeNote: state.activeNote });

const mapDispatchToProps = dispatch => ({
  deleteNote: noteId => dispatch(deleteNote(noteId)),
  editNote: note => dispatch(editNote(note)),
  setActiveNote: noteId => dispatch(setActiveNote(noteId)),
});

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      site: this.props.note.site,
      active: this.props.note.active,
    };

    this.delete = this.delete.bind(this);
    this.setActiveNote = this.setActiveNote.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.note !== prevProps.note) {
      this.setState({ active: this.props.note.active });
    }
  }

  delete(event) {
    event.stopPropagation();
    const confirmDelete = window.confirm('Do you really want to delete the note?');
    if (confirmDelete) {
      this.props.deleteNote(this.props.note.id);
    }
  }

  setActiveNote() {
    this.props.setActiveNote(this.props.note.id);
  }

  render() {
    return (
      <li
        className={this.state.active ? 'active' : null}
        onClick={this.setActiveNote}
        key={this.props.note.id}
      >
        <span className="note-title">
          {this.state.site}
        </span>
        <span className="note-options">
          <button onClick={this.delete} type="button">x</button>
        </span>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
