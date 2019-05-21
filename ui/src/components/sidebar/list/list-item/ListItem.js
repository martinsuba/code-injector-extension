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
      editMode: false,
      title: this.props.note.title,
      active: this.props.note.active,
    };

    this.delete = this.delete.bind(this);
    this.changeEditMode = this.changeEditMode.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
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

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleEditNote() {
    if (this.state.title !== this.props.note.title) {
      const note = {
        ...this.props.note,
        updatedAt: Date.now(),
        title: this.state.title,
      };
      this.props.editNote(note);
    }
    this.changeEditMode();
  }

  changeEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  renderEditView() {
    return (
      <input
        type="text"
        onBlur={this.handleEditNote}
        onChange={this.handleTitleChange}
        value={this.state.title}
        autoFocus
      />
    );
  }

  renderDefaultView() {
    return (
      <span className="note-title" onDoubleClick={this.changeEditMode}>
        {this.state.title}
      </span>
    );
  }

  setActiveNote() {
    this.props.setActiveNote(this.props.note.id);
  }

  render() {
    const { editMode } = this.state;
    return (
      <li
        className={this.state.active ? 'active' : null}
        onClick={this.setActiveNote}
        key={this.props.note.id}
      >
        { editMode ? this.renderEditView() : this.renderDefaultView() }
        <span className="note-type">
          <small>{this.props.note.type}</small>
        </span>
        <span className="note-options">
          <button onClick={this.delete} type="button">x</button>
        </span>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
