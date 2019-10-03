import React, { Component } from 'react';
import { connect } from 'react-redux';

import Code from './Code';

const mapStateToProps = state => ({ codes: state.codes });

class Content extends Component {
  renderCode() {
    const { codes: { items: codes } } = this.props;
    const activeCode = codes.find(code => code.active);

    if (activeCode == null) {
      return (
        <div style={{ margin: '20px', fontWeight: 600 }}>
          <div>Nothing here..</div>
          <div>← Add first code.</div>
        </div>
      );
    }

    return <Code code={activeCode} />;
  }

  render() {
    return (
      <div className="content">
        {this.renderCode()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Content);
