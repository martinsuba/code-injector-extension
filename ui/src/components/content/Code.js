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

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.saveContent = this.saveContent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.code !== prevProps.code) {
      this.setState({
        content: this.props.code.content,
        site: this.props.code.site,
      });
    }
  }

  handleCodeChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      if (this.timeoutId == null) {
        this.timeoutId = setTimeout(() => {
          const { content, site } = this.state;
          const { code } = this.props;
          this.saveContent({ content, site }, code);
        }, 1000);
      }
    });
  }

  saveContent({ content, site }, code) {
    if (code.id !== this.props.code.id) {
      code.active = false;
    }

    const newCode = {
      ...code,
      content,
      site,
      updatedAt: Date.now(),
    };

    this.props.editCode(newCode);

    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }

  render() {
    return (
      <form>
        <input
          name="site"
          onChange={this.handleCodeChange}
          value={this.state.site}
        />
        <textarea
          name="content"
          onChange={this.handleCodeChange}
          value={this.state.content}
        />
      </form>
    );
  }
}

export default connect(null, mapDispatchToProps)(Code);
