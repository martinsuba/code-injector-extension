// src/js/components/Form.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';
import { addNote } from '../actions/actions';

const initialState = {
  title: '',
  type: '',
};

const mapDispatchToProps = dispatch => ({
  addNote: article => dispatch(addNote(article)),
});

class Form extends Component {
  constructor() {
    super();

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { title, type } = this.state;

    const newNote = {
      id: uuidv4(),
      title,
      type,
      createdAt: Date.now(),
      updatedAt: null,
      content: {},
    };

    this.props.addNote(newNote);
    this.setState(initialState);
  }

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}

export default connect(null, mapDispatchToProps)(Form);
