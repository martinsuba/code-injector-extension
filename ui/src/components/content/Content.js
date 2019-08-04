import React, { Component } from 'react';
import { connect } from 'react-redux';

import Code from './Code';

const mapStateToProps = state => ({ codes: state.codes });

class Content extends Component {
  renderCode() {
    const { codes } = this.props;
    const activeCode = codes.find(code => code.active);

    return <Code code={activeCode} />;
  }

  render() {
    return this.renderCode();
  }
}

export default connect(mapStateToProps)(Content);
