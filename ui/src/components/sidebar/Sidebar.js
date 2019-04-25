import React, { Fragment } from 'react';
import List from './list/List';
import Add from './add/Add';

const Sidebar = () => (
  <Fragment>
    <h2>Sidebar</h2>
    <Add />
    <List />
  </Fragment>
);

export default Sidebar;
