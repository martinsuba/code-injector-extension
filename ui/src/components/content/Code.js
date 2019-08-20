import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import { editCode } from '../../actions/code-actions';
import { debounce } from '../../utils';

import './Code.scss';

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
    console.log(event);
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

    this.props.editCode(newCode);
  }

  render() {
    return (
      <Fragment>
        <div className="site-input">
          <label htmlFor="site">Site:</label>
          <input
            id="site"
            name="site"
            onChange={this.handleCodeChange}
            value={this.state.site}
          />
        </div>
        <div className="content-input">
          <label htmlFor="content">Code:</label>
          <Editor
            id="content"
            name="content"
            onValueChange={code => this.handleCodeChange({ target: { value: code, name: 'content' } })}
            value={this.state.content}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
              fontSize: 13,
              backgroundColor: '#262830',
              fontWeight: 600,
              height: '100%',
            }}
          />
        </div>
      </Fragment>
    );
  }
}

export default connect(null, mapDispatchToProps)(Code);