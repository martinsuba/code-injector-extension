import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editCode } from '../../actions/code-actions';

const mapDispatchToProps = dispatch => ({
  editCode: code => dispatch(editCode(code)),
});

class Code extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.code.content,
      site: props.code.site,
    };

    this.timeoutId = null;

    this.handleContentChange = this.handleContentChange.bind(this);
    this.saveContent = this.saveContent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.code !== prevProps.code) {
      this.setState({ content: this.props.code.content });
    }
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value }, () => {
      if (this.timeoutId == null) {
        const { content } = this.state;
        const { code } = this.props;

        this.timeoutId = setTimeout(() => {
          this.saveContent(content, code);
        }, 1000);
      }
    });
  }

  saveContent(content, code) {
    if (code.id !== this.props.code.id) {
      code.active = false;
    }

    const newCode = {
      ...code,
      content,
      updatedAt: Date.now(),
    };

    this.props.editCode(newCode);

    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleContentChange}
          value={this.state.site}
        />
        <textarea
          onChange={this.handleContentChange}
          value={this.state.content}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Code);
