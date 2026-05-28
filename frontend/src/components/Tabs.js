import React from 'react';
import './Tabs.css';

const Tabs = ({ count = 0 }) => {
  return (
    <div className="tabs-container">
      <div className="tabs-left">
        <button className="tab active">Lançamentos</button>
      </div>
      <div className="tabs-right">
        <span className="tabs-info">
          Mostrando {count} {count === 1 ? 'solução' : 'soluções'}
        </span>
      </div>
    </div>
  );
};

export default Tabs;
