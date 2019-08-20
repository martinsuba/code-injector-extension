import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';
import { addCode } from '../../../actions/code-actions';

import { ReactComponent as PlusCircle } from '../../../assets/images/plus-circle.svg';
import './Add.scss';

const mapDispatchToProps = dispatch => ({
  addCode: code => dispatch(addCode(code)),
});

class Add extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const newCode = {
      id: uuidv4(),
      site: 'new site',
      createdAt: Date.now(),
      updatedAt: null,
      active: false,
      content: 'add here',
    };

    this.props.addCode(newCode);
  }

  render() {
    return (
      <button type="submit" className="add-button" onClick={this.handleSubmit}>
        <PlusCircle />
      </button>
    );
  }
}

export default connect(null, mapDispatchToProps)(Add);
