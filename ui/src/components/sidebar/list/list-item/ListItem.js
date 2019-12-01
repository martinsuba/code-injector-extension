import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editCode, deleteCode, setActiveCode } from '../../../../actions/code-actions';

import { ReactComponent as DeleteImage } from '../../../../assets/images/x-circle.svg';

const mapStateToProps = state => ({ activeCode: state.activeCode });

const mapDispatchToProps = dispatch => ({
  deleteCode: code => dispatch(deleteCode(code)),
  editCode: code => dispatch(editCode(code)),
  setActiveCode: codeId => dispatch(setActiveCode(codeId)),
});

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.code.active,
    };

    this.delete = this.delete.bind(this);
    this.setActiveCode = this.setActiveCode.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.code !== prevProps.code) {
      this.setState({ active: this.props.code.active });
    }
  }

  delete(event) {
    event.stopPropagation();
    const confirmDelete = window.confirm('Do you really want to delete the code?');
    if (confirmDelete) {
      this.props.deleteCode(this.props.code);
    }
  }

  setActiveCode() {
    if (this.state.active) {
      return;
    }
    this.props.setActiveCode(this.props.code.id);
  }

  render() {
    return (
      <li
        className={this.state.active ? 'active' : null}
        onClick={this.setActiveCode}
        key={this.props.code.id}
      >
        <span className="code-title">
          {this.props.code.title}
        </span>
        <span className="code-options">
          <button className="button-delete" onClick={this.delete} type="button">
            <DeleteImage />
          </button>
        </span>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
