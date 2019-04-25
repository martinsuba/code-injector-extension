import React, { Component, Fragment } from 'react';

import './App.css';
import Sidebar from './sidebar/Sidebar';
// import Content from './content/Content';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Sidebar />
        {/* <Content /> */}
      </Fragment>
    );
  }
}

export default App;
