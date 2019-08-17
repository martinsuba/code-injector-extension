import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editCode } from '../../actions/code-actions';
import { debounce } from '../../utils';

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

    this.saveContentDebounced = debounce(this.saveContent, 1000);

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.saveContent = this.saveContent.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.code.id !== prevProps.code.id) {
      this.setState({
        content: this.props.code.content,
        site: this.props.code.site,
      });
    }
  }

  handleCodeChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const { content, site } = this.state;
      const { code } = this.props;
      this.saveContentDebounced({ content, site }, code);
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

    console.log(newCode.content);
    this.props.editCode(newCode);
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
