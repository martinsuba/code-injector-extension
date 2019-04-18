import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ articles: state.articles });

const List = ({ articles }) => (
  <ul className="list-group list-group-flush">
    {articles.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);

export default connect(mapStateToProps)(List);
