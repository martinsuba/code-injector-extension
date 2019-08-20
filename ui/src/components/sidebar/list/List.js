import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListItem from './list-item/ListItem';

import './List.scss';

const mapStateToProps = state => ({ codes: state.codes });

class List extends Component {
  render() {
    const { codes: { items: codes } } = this.props;
    return (
      <ul className="code-list">
        {codes.map(code => <ListItem key={code.id} code={{ ...code }} />)}
      </ul>
    );
  }
}

export default connect(mapStateToProps)(List);
