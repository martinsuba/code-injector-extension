import React from 'react';
import List from './list/List';
import Add from './add/Add';

const Sidebar = () => (
  <div className="sidebar">
    <Add />
    <List />
  </div>
);

export default Sidebar;
