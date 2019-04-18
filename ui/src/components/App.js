import React, { Component, Fragment } from 'react';

import './App.css';
import Sidebar from './sidebar/Sidebar';
import Form from './Form';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Fragment>
        <Sidebar />
        <Form />
      </Fragment>
    );
  }
}

export default App;
