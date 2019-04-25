import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';
import { addNote } from '../../../actions/note-actions';

const noteTypes = ['plain', 'todo', 'code'];
const initialState = {
  title: '',
  type: noteTypes[0],
};

const mapDispatchToProps = dispatch => ({
  addNote: note => dispatch(addNote(note)),
});

class Add extends Component {
  constructor(props) {
    super(props);

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
    const labels = noteTypes.map((type, index) => (
      <label key={index}>
        <input type="radio" id="type" value={type}
          checked={this.state.type === type}
          onChange={this.handleChange}
          required
        />
        <span>{type}</span>
        </label>
    ));

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
            required
          />
        </div>
        <div className="form-group">
          {labels}
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          Create
        </button>
      </form>
    );
  }
}

export default connect(null, mapDispatchToProps)(Add);
