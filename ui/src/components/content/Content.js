import React, { Component } from 'react';
import { connect } from 'react-redux';

import Code from './Code';

const mapStateToProps = state => ({ codes: state.codes });

class Content extends Component {
  renderCode() {
    const { codes: { items: codes } } = this.props;
    const activeCode = codes.find(code => code.active);

    if (activeCode == null) {
      return <div>no codes</div>;
    }

    return <Code code={activeCode} />;
  }

  render() {
    return this.renderCode();
  }
}

export default connect(mapStateToProps)(Content);
