import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.scss';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';
import Preloader from './preloader/Preloader';
import { getCodes } from '../utils/storage';

const mapStateToProps = state => ({ codes: state.codes });

class App extends Component {
  componentDidMount() {
    const { dispatchGetCodes } = this.props;
    dispatchGetCodes();
  }

  render() {
    // TODO: build preloader
    if (this.props.codes.loading) {
      return <Preloader />;
    }
    return (
      <div className="container">
        <Sidebar />
        <Content />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatchGetCodes: getCodes,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
