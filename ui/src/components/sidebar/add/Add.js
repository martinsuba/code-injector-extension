import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';
import { addNote } from '../../../actions/note-actions';

const mapDispatchToProps = dispatch => ({
  addNote: note => dispatch(addNote(note)),
});

class Add extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const newNote = {
      id: uuidv4(),
      site: 'new site',
      createdAt: Date.now(),
      updatedAt: null,
      active: false,
      content: 'add here',
    };

    this.props.addNote(newNote);
  }

  render() {
    return (
      <button type="submit" className="btn btn-success btn-lg" onClick={this.handleSubmit}>
          Create
        </button>
    );
  }
}

export default connect(null, mapDispatchToProps)(Add);
