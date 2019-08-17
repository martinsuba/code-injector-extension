import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListItem from './list-item/ListItem';

const mapStateToProps = state => ({ codes: state.codes });

class List extends Component {
  render() {
    const { codes: { items: codes } } = this.props;
    return (
      <ul className="list-group list-group-flush">
        {codes.map(code => <ListItem key={code.id} code={{ ...code }} />)}
      </ul>
    );
  }
}

export default connect(mapStateToProps)(List);
