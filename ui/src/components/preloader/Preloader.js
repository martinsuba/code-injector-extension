import React from 'react';

import './Preloader.scss';

export default function Preloader() {
  return (
    <div className="preloader-container">
      <div className="preloader-animation">
        <div className="a" style={{ '--n': 5 }}>
          <div className="dot" style={{ '--i': 0 }}></div>
          <div className="dot" style={{ '--i': 1 }}></div>
          <div className="dot" style={{ '--i': 2 }}></div>
          <div className="dot" style={{ '--i': 3 }}></div>
          <div className="dot" style={{ '--i': 4 }}></div>
        </div>
      </div>
    </div>
  );
}
