import React, { Component } from 'react';
import { connect } from 'react-redux';

import Code from './Code';

import './Content.scss';

const mapStateToProps = state => ({ codes: state.codes });

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaving: false,
    };

    this.onSave = this.onSave.bind(this);
  }

  renderCode() {
    const { codes: { items: codes } } = this.props;
    const activeCode = codes.find(code => code.active);

    if (activeCode == null) {
      return (
        <div className="no-items">
          <div>Nothing here..</div>
          <div>← Add first code.</div>
        </div>
      );
    }

    return <Code code={activeCode} onSave={this.onSave} />;
  }

  onSave() {
    this.setState({ isSaving: true });
    setTimeout(() => this.setState({ isSaving: false }), 1000);
  }

  render() {
    return (
      <div className="content">
        <div className={`save-indicator ${this.state.isSaving ? 'animate' : ''}`}></div>
        {this.renderCode()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Content);
