import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Services from 'external-services';

import './App.css';
import Sidebar from './sidebar/Sidebar';
import Content from './content/Content';
import { getCodes } from '../utils/storage';

const mapStateToProps = state => ({ codes: state.codes });

class App extends Component {
  componentDidMount() {
    const { dispatchGetCodes } = this.props;
    dispatchGetCodes();
    // console.log(Services);
  }

  render() {
    // TODO: build preloader
    if (this.props.codes.loading) {
      return (<div>loading</div>);
    }
    return (
      <Fragment>
        <Sidebar />
        <Content />
      </Fragment>
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
